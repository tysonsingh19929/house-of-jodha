

const API_BASE_URL = 'https://house-of-jodha-backend.onrender.com/api';

async function assignProductsToDemoSeller() {
  try {
    console.log("1. Registering 'Demo Seller 1'...");
    
    // Default dummy number is exactly the one hardcoded previously
    const demoPhone = "919967670497"; 
    
    // Register Demo Seller
    let demoSellerId;
    let demoSellerName = "Demo Seller 1";
    
    const registerRes = await fetch(`${API_BASE_URL}/sellers/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: demoSellerName,
        email: "demo1@houseofjodha.com",
        password: "securepassword123",
        businessName: "Demo Outlet",
        phone: demoPhone
      })
    });
    
    const registerData = await registerRes.json();
    
    // If already registered, fetch all sellers and find Demo Seller 1
    if (!registerRes.ok && registerData.message === "Email already registered") {
      console.log("Demo Seller 1 already exists. Fetching their ID...");
      const sellersRes = await fetch(`${API_BASE_URL}/sellers`);
      const sellers = await sellersRes.json();
      const existingDemo = sellers.find(s => s.email === "demo1@houseofjodha.com");
      
      if (!existingDemo) {
        throw new Error("Could not find the Demo Seller ID.");
      }
      demoSellerId = existingDemo._id;
      
      // Patch the phone just in case it didn't have one
      await fetch(`${API_BASE_URL}/sellers/${demoSellerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: demoPhone })
      });
      
    } else if (registerRes.ok) {
      demoSellerId = registerData.seller.id;
      console.log(`Created new Demo Seller! ID: ${demoSellerId}`);
    } else {
       throw new Error("Registration failed: " + registerData.message);
    }
    
    console.log(`\n2. Fetching all existing products...`);
    const productsRes = await fetch(`${API_BASE_URL}/products`);
    const products = await productsRes.json();
    console.log(`Found ${products.length} products to re-assign.`);
    
    let successCount = 0;
    
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        const updateRes = await fetch(`${API_BASE_URL}/products/${p._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sellerId: demoSellerId,
                sellerName: demoSellerName
            })
        });
        
        if (updateRes.ok) {
            successCount++;
            if (successCount % 10 === 0) console.log(`[${successCount}/${products.length}] products mapped...`);
        } else {
            console.error(`Failed to map product ${p._id}`);
        }
    }
    
    console.log(`\n✅ Successfully re-assigned ${successCount} products to Demo Seller 1 (WhatsApp: ${demoPhone}).`);
  } catch (err) {
    console.error("Migration Error:", err);
  }
}

assignProductsToDemoSeller();

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/products.js"; // Importing the Master List
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetail({ cartCount, onCartClick, addToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Search the Master List
    const found = products.find(p => String(p.id) === String(productId));
    setProduct(found);
    setLoading(false);
  }, [productId]);

  if (loading) return <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>;
  
  if (!product) return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h2>Product Not Found</h2>
      <button onClick={() => navigate("/")}>Back Home</button>
    </div>
  );

  return (
    <div style={{ paddingTop: "80px" }}>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ flex: "1", minWidth: "300px", background: "#f9f9f9", fontSize: "100px", textAlign: "center", padding: "50px", borderRadius: "15px" }}>
          {product.image}
        </div>
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>{product.name}</h1>
          <p style={{ fontSize: "24px", color: "#D4AF37", fontWeight: "bold", marginBottom: "20px" }}>₹{product.price}</p>
          <button onClick={() => addToCart(product)} style={{ padding: "15px 30px", background: "#1a0010", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%" }}>
            ADD TO CART
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
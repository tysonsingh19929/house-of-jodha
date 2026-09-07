fetch('https://msretail.in/assets/index-4s3Lw0cM.js').then(r=>r.text()).then(t => console.log('Contains AddProductWizard:', t.includes('AddProductWizard')))

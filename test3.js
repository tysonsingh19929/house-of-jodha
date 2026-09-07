fetch('https://house-of-jodha.vercel.app').then(r=>r.text()).then(t => console.log(t.split('<script')[1].substring(0,200)))

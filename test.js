fetch('https://msretail.in').then(r=>r.text()).then(t => console.log(t.split('<script')[1].substring(0,200)))

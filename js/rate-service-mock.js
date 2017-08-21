let rates = [
    {
        "name": "30 years fixed",
        "rate": "13",
        "years": "30"
    },
    {
        "name": "20 years fixed",
        "rate": "2.8",
        "years": "20"
    }
];

export let findAll = () => new Promise((resolve, reject) => {
    if (rates) {
        resolve(rates);
    } else {
        reject("No rates");
    }
});

import * as service from './rate-service-mock';

service.findAll()
    .then(rates => {
        let html = '';
        rates.forEach(rate => html += `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>`);
        document.getElementById("rates").innerHTML = html;
    })
    .catch(e => console.log(e));

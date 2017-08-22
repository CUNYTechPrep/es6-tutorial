export let calculateMonthlyPayment = (principal, years, rate) => {
    let monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), years * 12)));
    return {principal, years, rate, monthlyPayment, monthlyRate};
};

export let calculateAmortization = (principal, years, rate) => {
    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);
    let balance = principal;
    let amortization = [];
    for(let y = 0; y < years; y++){
        let interestY = 0;
        let principalY = 0; 
        for(let m = 0; m < 12; m++){
            let interestM = balance * monthlyRate;
            let principalM = monthlyPayment -interestM;
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({principalY, interestY, balance})
    }
    return {monthlyPayment, monthlyRate, amortization};
}
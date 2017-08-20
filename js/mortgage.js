// Where did this come from? A differential equation? You have a yearly
// interest rate, and every month, you're going to be charged some
// amount that should cover the interest on the current balance and then
// reduce the current balance, and we have to figure out how much to pay
// every month so that in `months` amount of months, the pricipal and
// interest is paid off?
// Let's just take this one for granted. This is how monthly payments
// are calculated in a mortgage.
export let calculateMonthlyPayment = (principal, years, rate) => {
		let monthlyRate = 0;
    if (rate) {
				// So, rate units is percent. A rate of 10 is 10%.
				// The given rate is really the yearly rate, and we split that
				// up evenly over each month.
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / 
													(1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    //return monthlyPayment;
    return {principal, years, rate, monthlyPayment, monthlyRate};
};

export let calculateAmortization = (principal, years, rate) => {
	let {monthlyPayment, monthlyRate} = calculateMonthlyPayment(principal, years, rate);
	let balance = principal
	let amortization = [];
	for (let y = 0; y < years; y++) {
		let interestY = 0;
		let principalY = 0;
		for (let m = 0; m < 12; m++) {
			// The rate is the interest rate. So every month, you owe some
			// amount of the remaining principal as interest.
			let interestM = balance * monthlyRate;
			// This is the leftover amount from the monthly payment after
			// taking away the amount you owed in interest
			let principalM = monthlyPayment - interestM;
			interestY += interestM;
			principalY += principalM;
			balance -= principalM;
		}
		amortization.push({principalY, interestY, balance});
	}
	return {monthlyPayment, monthlyRate, amortization};
}

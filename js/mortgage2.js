export default class Mortgage{
	constructor(principal, years, rate) {
		this.principal = principal;
		this.years = years;
		this.rate = rate;
	}

	get monthlyRate() {
		return this.rate / 100 / 12;
	}
	get monthlyPayment() {
		return this.principal * this.monthlyRate /
			(1 - (Math.pow(1 / (1 + this.monthlyRate), this.years * 12)));
	}

	get amortization() {
		let monthlyPayment = this.monthlyPayment;
		let monthlyRate = this.monthlyRate;
		let balance = this.principal;
		let amortization = [];
		for (let y = 0; y < this.years; y++) {
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
		return amortization;
	}
}


import * as mortgage from './mortgage';

document.getElementById('calcBtn').addEventListener('click', () => {
	let principal = document.getElementById("principal").value;
	let years = document.getElementById("years").value;
	let rate = document.getElementById("rate").value;
	let {monthlyPayment, monthlyRate, amortization} =
		mortgage.calculateAmortization(principal, years, rate);
	document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
	document.getElementById("monthlyRate").innerHTML = monthlyRate.toFixed(2);
	let interestRatios = amortization.map(({interestY}) => interestY / monthlyPayment / 12);
	let interestRatioTable = createWidthTable(interestRatios);
	let paymentRatios = amortization.map(({balance}) => 1 - (balance / principal));
	let paymentRatioTable = createWidthTable(paymentRatios);
	document.getElementById('payment-ratio').insertAdjacentElement(
		'afterend', interestRatioTable);
	document.getElementById('paid-off').insertAdjacentElement(
		'afterend', paymentRatioTable);

	amortization.forEach(month => console.log(month));
});

/*
// How much of your monthly payment goes to interest?
let createPaymentRatioTable = function(amortization, monthlyPayment) {
	let table = document.createElement('table');
	let rows = amortization.map(o => {
		let {interestY} = o;
		let row = document.createElement('tr');
		row.classList.add("total");
		let interestPortion = document.createElement('div');
		interestPortion.classList.add("portion");
		let width = interestY / monthlyPayment;
		interestPortion.style.width = `${width}%`;
		row.appendChild(interestPortion);
		return row;
	});
	rows.forEach(r => table.appendChild(r));
	return table;
}
*/

let createWidthTable = function(widths) {
	let table = document.createElement('table');
	let rows = widths.map(w => {
		let row = document.createElement('tr');
		row.classList.add("total");
		let partialPortion = document.createElement('div');
		partialPortion.classList.add("portion");
		// Just in case the result ends up partially negative, which it
		// does.
		let displayWidth = Math.max(0, (w*100).toFixed(2));
		partialPortion.style.width = `${displayWidth}%`;
		row.appendChild(partialPortion);
		return row;
	});
	rows.forEach(r => table.appendChild(r));
	table.classList.add("ratio-table");
	return table;
}

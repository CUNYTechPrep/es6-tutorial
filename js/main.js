import Mortgage from './mortgage2';

document.getElementById('calcBtn').addEventListener('click', () => {
	let principal = document.getElementById("principal").value;
	let years = document.getElementById("years").value;
	let rate = document.getElementById("rate").value;
	let mortgage = new Mortgage(principal, years, rate);
	let amortization = mortgage.amortization;

	document.getElementById("monthlyPayment").innerHTML = mortgage.monthlyPayment.toFixed(2);
	document.getElementById("monthlyRate").innerHTML = mortgage.monthlyRate.toFixed(2);

	//let interestRatios = amortization.map(({interestY}) => 
		//interestY / mortgage.monthlyPayment / 12);
	let interestRatios = amortization.map(({principalY}) => 
		principalY / mortgage.monthlyPayment / 12);
	let interestRatioTable = createWidthTable(interestRatios);
	let paymentRatios = amortization.map(({balance}) => 1 - (balance / principal));
	let paymentRatioTable = createWidthTable(paymentRatios);
	document.getElementById('payment-ratio').insertAdjacentElement(
		'afterend', interestRatioTable);
	document.getElementById('paid-off').insertAdjacentElement(
		'afterend', paymentRatioTable);
	//console.log(interestRatios);
	//console.log(paymentRatios);

	//*
	let html = `
		<tr>
			<th>Year</th>
			<th>Principal Paid This Year</th>
			<th>Principal-to-Interest Ratio This Year
					<span class="principal">(Principal)</span>
					<span class="interest">(Interest)</span>
			</th>
			<th>Interest Paid This Year</th>
			<th>Remaining Balance</th>
		</tr>
	`
	mortgage.amortization.forEach((year, index) => html += `
		<tr>
			<td>${index + 1}</td>
			<td class="currency">${Math.round(year.principalY)}</td>
			<td class="stretch">
				<div class="flex">
					<div class="bar principal"
							 style="flex:${year.principalY};-webkit-flex:${year.principalY}">
					</div>
					<div class="bar interest"
							 style="flex:${year.interestY};-webkit-flex:${year.interestY}">
					</div>
				</div>
			</td>
			<td class="currency left">${Math.round(year.interestY)}</td>
			<td class="currency">${Math.round(year.balance)}</td>
		</tr>
	`);
	document.getElementById('amortization').innerHTML = html;
	//*/
});

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

let rates = [
	{
		"name" : "30 years fixed",
		"rate" : 13,
		"years" : 30,
	},
	{
		"name" : "20 years fixed",
		"rate" : 2.8,
		"years" : 20,
	},
	{
		"name" : "20 years fixed",
		"rate" : 2.8,
		"years" : 20,
	},
]

export let findAll = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		if (rates) {
			resolve(rates);
		} else {
			reject("Ain't here, bredren.");
		}
	}, 1000);
});

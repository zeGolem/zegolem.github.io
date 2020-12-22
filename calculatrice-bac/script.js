const createEl = el => document.createElement(el);
const createRow = () => createEl("tr");
const createCol = () => createEl("td");
const get = el => document.querySelector(el);

const subjects = {
	es: {
		name: "Enseignement Scientifique",
		weight: 5,
	},
	hg: {
		name: "Histoire-Géographie",
		weight: 5,
	},
	lva: {
		name: "LVA",
		weight: 5,
	},
	lvb: {
		name: "LVB",
		weight: 5,
	},
	eps: {
		name: "EPS",
		weight: 5,
	},
	spe0: {
		name: "Spécialitée arrêté en première",
		weight: 5,
	},
	spe1: {
		name: "Spécialitée 1",
		weight: 16,
	},
	spe2: {
		name: "Spécialitée 2",
		weight: 16,
	},
	grades1: {
		name: "Notes de première",
		weight: 5,
	},
	grades2: {
		name: "Notes de terminale",
		weight: 5,
	},
	fr: {
		name: "Français",
		weight: 10,
	},
	go: {
		name: "Grand Oral",
		weight: 10,
	},
	philosophy: {
		name: "Philosophie",
		weight: 8,
	},
	lca: {
		name: "LCA (Latin/Grec)",
		weight: 3,
		option: true,
	},
};

const table = get("table");
let maxPts = 0;

const computeGrades = () => {
	let ptsSum = 0;
	for (const subjectID in subjects) {
		const subject = subjects[subjectID];
		const outPts = get(`output#out-${subjectID}`);
		const inGrade = get(`input#in-${subjectID}`);
		let pts;
		let calcPts = "";
		if (!subject.option) {
			pts = inGrade.value * subject.weight;
			calcPts = `${inGrade.value} * ${subject.weight}`;
		}
		else {
			let grade = inGrade.value;
			if (grade < 10)
				pts = -1;
			else {
				pts = (grade - 10) * subject.weight;
				calcPts = `(${grade} - 10) * ${subject.weight}`;
			}
		}
		outPts.innerText = `${pts == -1 ? "N/A" : `${calcPts} = ${pts}`}`;
		if (pts != -1)
			ptsSum += pts;
	}
	const outTotalPts = get("output#out-totalpts");
	outTotalPts.innerText = ptsSum;
	const outFinalGrade = get("output#out-finalgrade");
	outFinalGrade.value = `20 * (${ptsSum} / ${maxPts}) = ${Math.round(((ptsSum / maxPts) * 20) * 100) / 100}`;
};


const populateTable = () => {
	let weightSum = 0;

	const body = table.querySelector("tbody");
	for (const subjectID in subjects) {
		let subject = subjects[subjectID];
		let row = createRow();
		if (subject.option) row.classList.add("option");

		let nameCol = createCol();
		nameCol.innerText = subject.name;
		row.appendChild(nameCol);

		let gradeCol = createCol();
		let gradeInput = createEl("input");
		gradeInput.type = "number";
		gradeInput.min = "0";
		gradeInput.max = "20";
		gradeInput.value = "0";
		gradeInput.id = `in-${subjectID}`;
		gradeInput.onchange = computeGrades;
		gradeCol.appendChild(gradeInput);
		row.appendChild(gradeCol);

		let weightCol = createCol();
		weightCol.innerHTML = subject.weight;
		row.appendChild(weightCol);

		let ptsCol = createCol();
		let ptsOutput = createEl("output");
		ptsOutput.id = `out-${subjectID}`;
		ptsCol.appendChild(ptsOutput);
		row.appendChild(ptsCol);

		let maxPtsCol = createCol();
		if (subject.option)
			maxPtsCol.innerText = `${subject.weight * 10}`;
		else
			maxPtsCol.innerText = `${subject.weight * 20}`;
		row.appendChild(maxPtsCol);

		body.appendChild(row);
		if (!subject.option)
			weightSum += subject.weight;
	}

	const outWeight = table.querySelector("output#out-totalweight");
	outWeight.innerText = weightSum;
	const outMaxPts = table.querySelector("output#out-totalmaxpts");
	maxPts = weightSum * 20;
	outMaxPts.innerText = maxPts;

	computeGrades();
};

populateTable();
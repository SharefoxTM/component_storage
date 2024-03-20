export const importPassiveFields = [
	{
		label: "Part name",
		key: "name",
		fieldType: {
			type: "input",
		},
		example: "R_10K_0603_10%_100mW",
		validations: [
			{
				rule: "required",
				errorMessage: "Part name is required",
				level: "error",
			},
		],
	},
	{
		label: "Category name",
		key: "cat_name",
		fieldType: {
			type: "input",
		},
		example: "resistor",
		validations: [
			{
				rule: "required",
				errorMessage: "Category name is required",
				level: "error",
			},
		],
	},
	{
		label: "Minimal stock",
		key: "min_stock",
		fieldType: {
			type: "input",
		},
	},
	{
		label: "Description",
		key: "description",
		fieldType: {
			type: "input",
		},
	},
	{
		label: "Package",
		key: "package",
		fieldType: {
			type: "input",
		},
		example: "0603",
		validations: [
			{
				rule: "required",
				errorMessage: "Package is required",
				level: "error",
			},
		],
	},
	{
		label: "Resistance",
		key: "resistance",
		fieldType: {
			type: "input",
		},
		example: "1kohms",
	},
	{
		label: "Capacitance",
		key: "capacitance",
		fieldType: {
			type: "input",
		},
		example: "100nF",
	},
	{
		label: "Inductance",
		key: "inductance",
		fieldType: {
			type: "input",
		},
		example: "1mH",
	},
	{
		label: "Tolerance",
		key: "tolerance",
		fieldType: {
			type: "input",
		},
		example: "10",
	},
	{
		label: "Voltage",
		key: "voltage",
		fieldType: {
			type: "input",
		},
		example: "50",
	},
	{
		label: "Power",
		key: "power",
		fieldType: {
			type: "input",
		},
		example: "1/10",
	},
	{
		label: "Polarized",
		key: "pol",
		fieldType: {
			type: "checkbox",
		},
		example: "false",
	},
];

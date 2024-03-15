import axios from "axios";
import { Button } from "../../components/Button";
import Card from "../../components/Card/Card";
import { PutReelModal } from "../../components/Modals/PutReelModal";
import { LocationList } from "../../components/Storage/LocationList";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { useState } from "react";

const fields = [
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
];

const getReel = (e: React.MouseEvent<HTMLElement>) => {
	axios
		.get(`${process.env.REACT_APP_BE_HOST}storage/${e.currentTarget.id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err.message);
		});
};

const submitExcel = (data: any, file: any) => {
	console.log(data);
};

export const Storage = () => {
	const [isOpen, setIsOpen] = useState(true);
	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row justify-center">
				<div className="basis-3/4 md:shrink-0">
					<Card.CardContainer>
						<Card.CardTitle>
							<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
								Storage Controls
							</div>
							<div className="flex flex-row gap-5 items-center me-3">
								<Button
									variant="success"
									size="sm"
									negative
									className="overflow-hidden align-middle"
									onClick={() => {
										(
											document.getElementById(
												"storageNewEditModal",
											)! as HTMLDialogElement
										).showModal();
									}}
								>
									New storage
								</Button>
							</div>
						</Card.CardTitle>
						<Card.CardBody>
							<div className="flex flex-col w-full">
								<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row">
									<div className="basis-1/2 md:shrink-0 gap-2">
										<div className="flex w-full gap-5">
											<Button onClick={getReel}>Get reel</Button>
											<Button
												onClick={() => {
													(
														document.getElementById(
															"putReelModal",
														)! as HTMLDialogElement
													).showModal();
												}}
											>
												Put reel
											</Button>
										</div>
									</div>
								</div>
								<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row mt-2">
									<div className="md:w-full md:shrink-0 gap-2">
										<h1 className="text-white text-lg font-bold">Locations:</h1>
										<div className="flex w-full gap-5">
											<LocationList />
										</div>
									</div>
								</div>
								<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row mt-2">
									<div className="md:w-full md:shrink-0 gap-2">
										<h1 className="text-white text-lg font-bold">Import</h1>
										<div className="flex w-full gap-5">
											<ReactSpreadsheetImport
												isOpen={isOpen}
												onClose={onClose}
												onSubmit={submitExcel}
												fields={fields}
											/>
										</div>
									</div>
								</div>
							</div>
							<PutReelModal />
						</Card.CardBody>
					</Card.CardContainer>
				</div>
			</div>
		</>
	);
};

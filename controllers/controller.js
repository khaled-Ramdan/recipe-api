import { recipes } from "../model/model.js";

export const getRecipe = (req, res) => {
	let { name, sort, filter } = req.query;
	let { id } = req.params;
	console.log(id);
	let result;

	let sortKey = 1;
	if (sort.startsWith("-")) {
		sortKey = -1;
		sort = sort.substr(1);
	}
	result = recipes.sort((a, b) => (a[sort] > b[sort] ? sortKey : -sortKey));

	res.json(result);
};

export const getRecipeById = (req, res) => {
	let { id } = req.params;
	let result = recipes.filter((recipe) => recipe.id === id);
	res.json(result);
};

export const updateRecipe = (req, res) => {
	let { id } = req.params;
	let { name, price, chef_name, description, ingredients, instructions, cooking_time, calories } = req.body;
	let recipe = -1;
	for (let i = 0; i < recipes.length; i++) {
		if (recipes[i].id == id) {
			recipe = i;
			break;
		}
	}
	if (recipe == -1)
		return res.status(404).json({ state: "failed", message: "The id is not found" });
	recipes[recipe].name = (name == undefined ? recipes[recipe].name : name);
	recipes[recipe].price = (price == undefined ? recipes[recipe].price : price);
	recipes[recipe].chef_name = (chef_name == undefined ? recipes[recipe].chef_name : chef_name);
	recipes[recipe].description = (description == undefined ? recipes[recipe].description : description);
	recipes[recipe].ingredients = (ingredients == undefined ? recipes[recipe].ingredients : ingredients);
	recipes[recipe].instructions = (instructions == undefined ? recipes[recipe].instructions : instructions);
	recipes[recipe].cooking_time = (cooking_time == undefined ? recipes[recipe].cooking_time : cooking_time);
	recipes[recipe].calories = (calories == undefined ? recipes[recipe].calories : calories);
	res.status(200).json(recipes[recipe]);
};

export const deleteRecipe = (req, res) => {
	const { id } = req.params;
	const idx = recipes.findIndex((recipe) => recipe.id == id);
	if (idx === -1) {
		res.status(404).json({
			message: `Recipe with id ${id} is not found`,
		});
	}
	recipes.splice(idx, 1);
	res.status(200).json(recipes);
};

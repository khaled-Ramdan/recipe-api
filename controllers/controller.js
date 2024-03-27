import { recipes, append_element, getl, chefs } from "../model/model.js"

export const getRecipe = (req, res) => {
	let { name, sort, filter } = req.query
	let { id } = req.params
	console.log(id)
	let result

	let sortKey = 1
	if (sort.startsWith("-")) {
		sortKey = -1
		sort = sort.substr(1)
	}
	result = recipes.sort((a, b) => (a[sort] > b[sort] ? sortKey : -sortKey))

	res.json(result)
}

export const getRecipeById = (req, res) => {
	let { id } = req.params
	let result = recipes.filter((recipe) => recipe.id === id)
	console.log(id)
	res.json(result)
}

export const updateRecipe = (req, res) => {
	let { id } = req.params
	let {
		name,
		price,
		chef_name,
		Description,
		Ingredients,
		Instructions,
		cooking_time,
		Calories,
	} = req.body
	let recipe = -1
	for (let i = 0; i < recipes.length; i++) {
		if (recipes[i].id == id) {
			recipe = i
			break
		}
	}
	if (recipe == -1)
		return res
			.status(404)
			.json({ state: "failed", message: "The id is not found" })
	recipes[recipe].name = name == undefined ? recipes[recipe].name : name
	recipes[recipe].price = price == undefined ? recipes[recipe].price : price
	recipes[recipe].chef_name =
		chef_name == undefined ? recipes[recipe].chef_name : chef_name
	recipes[recipe].Description =
		Description == undefined ? recipes[recipe].Description : Description
	recipes[recipe].Ingredients =
		Ingredients == undefined ? recipes[recipe].Ingredients : Ingredients
	recipes[recipe].Instructions =
		Instructions == undefined ? recipes[recipe].Instructions : Instructions
	recipes[recipe].cooking_time =
		cooking_time == undefined ? recipes[recipe].cooking_time : cooking_time
	recipes[recipe].Calories =
		Calories == undefined ? recipes[recipe].Calories : Calories
	res.status(200).json(recipes[recipe])
}

export const getChefById = (req, res) => {
	let { chefId } = req.params
	let result = chefs.filter((chef) => chef.id === chefId)
	res.json(result)
}

export const createRecipe = (req, res) => {
	let id = recipes.length
	let {
		name,
		price,
		chef_name,
		Description,
		Ingredients,
		Instructions,
		cooking_time,
		Calories,
	} = req.body
	if (name == null) {
		res.status(404).json({ state: "failed", message: "name is required" })
		return
	}
	if (price == null) {
		res.status(404).json({ state: "failed", message: "price is required" })
		return
	}
	if (chef_name == null) {
		res.status(404).json({ state: "failed", message: "chef name is required" })
		return
	}
	if (Description == null) {
		res
			.status(404)
			.json({ state: "failed", message: "Description is required" })
		return
	}
	if (Ingredients == null) {
		res
			.status(404)
			.json({ state: "failed", message: "Ingredients is required" })
		return
	}
	if (Instructions == null) {
		res
			.status(404)
			.json({ state: "failed", message: "Instructions is required" })
		return
	}
	if (cooking_time == null) {
		res
			.status(404)
			.json({ state: "failed", message: "cooking time is required" })
		return
	}
	if (Calories == null) {
		res
			.status(404)
			.json({ state: "failed", message: "Calories time is required" })
		return
	}
	let x = {}
	x.id = "id" + (id + 1)
	x.name = name
	x.price = price
	x.chef_name = chef_name
	x.Description = Description
	x.Ingredients = Ingredients
	x.Instructions = Instructions
	x.cooking_time = cooking_time
	x.Calories = Calories
	// recipes.push(x);
	append_element(x)

	res.status(200).json(getl())
}

export const deleteRecipe = (req, res) => {
	const { id } = req.params
	const idx = recipes.findIndex((recipe) => recipe.id == id)
	if (idx === -1) {
		res.status(404).json({
			message: `Recipe with id ${id} is not found`,
		})
	}
	recipes.splice(idx, 1)
	res.status(200).json(recipes)
}

export const getSimilarRecipes = (req, res) => {
	const { id } = req.params
	const recipe = recipes.find((recipe) => recipe.id === id)
	if (!recipe) {
		res.status(404).json({
			message: `Recipe with id ${id} is not found`,
		})
	}
	const ingredients = recipe.ingredients
	const similar = []
	recipes.forEach((recipe) => {
		if (recipe.id !== id) {
			const similarity = ingredients.reduce((similarity, ingredient) => {
				return similarity + recipe.ingredients.includes(ingredient)
			}, 0)
			if (similarity >= ingredients.length / 2) {
				similar.push(recipe)
			}
		}
	})
	res.status(200).json(similar)
}

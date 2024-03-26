import { recipes } from "../model/model.js"

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
	res.json(result)
}

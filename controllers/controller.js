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

export const updateRecipe = (req, res) => {
	let {id} = req.params
	let {name, price, chef_name, Description, Ingredients, Instructions, cooking_time, Calories} = req.body 
	let recipe = -1
	for(let i = 0; i < recipes.length ; i ++)
	{
		if(recipes[i].id == id)
		{
			recipe = i
			break
		}
	}
	if(recipe == -1)
		return res.status(404).json({state : "failed", message : "The id is not found"})
	recipes[recipe].name = (name == undefined ? recipes[recipe].name : name) 
	recipes[recipe].price = (price == undefined ? recipes[recipe].price : price) 
	recipes[recipe].chef_name = (chef_name == undefined ? recipes[recipe].chef_name : chef_name) 
	recipes[recipe].Description = (Description == undefined ? recipes[recipe].Description : Description) 
	recipes[recipe].Ingredients = (Ingredients == undefined ? recipes[recipe].Ingredients : Ingredients) 
	recipes[recipe].Instructions = (Instructions == undefined ? recipes[recipe].Instructions : Instructions) 
	recipes[recipe].cooking_time = (cooking_time == undefined ? recipes[recipe].cooking_time : cooking_time) 
	recipes[recipe].Calories = (Calories == undefined ? recipes[recipe].Calories : Calories) 
	res.status(200).json(recipes[recipe])
	
}
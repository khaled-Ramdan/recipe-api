import { mongo } from 'mongoose'
import AppError from '../errorHandling/AppError.js'
import { recipes, append_element, getl, chefs } from '../model/model.js'
import { Recipe } from '../model/recipe.js'
import { Chef } from '../model/chef.js'

// khaled
export const getRecipe = async (req, res, next) => {
    let { name, chefName, minPrice, maxPrice, sort } = req.query

    let result

    const seacrchQuery = {}

    if (name) seacrchQuery.name = { $regex: name, $options: 'i' }
    if (chefName) seacrchQuery.chef_name = { $regex: chefName, $options: 'i' }

    if (minPrice && !isNaN(minPrice))
        seacrchQuery.price
            ? (seacrchQuery.price['$gte'] = minPrice)
            : (seacrchQuery.price = { $gte: minPrice })

    if (maxPrice && !isNaN(maxPrice))
        seacrchQuery.price
            ? (seacrchQuery.price['$lte'] = maxPrice)
            : (seacrchQuery.price = { $lte: maxPrice })

    try {
        result = await Recipe.find(seacrchQuery).sort(sort)
    } catch (err) {
        next(
            new AppError(
                'Something went wrong. Type correct query and try agin',
                401
            )
        )
        return
    }

    res.status(200).json(result)
}

export const getRecipeById = async (req, res, next) => {
    let { id } = req.params

    let result = undefined
    try {
        result = await Recipe.findById(id, {
            name: 1,
            price: 1,
            chef_name: 1,
            cooking_time: 1,
            _id: 0,
        })
    } catch (err) {
        next(new AppError(`can't find recipe with id = ${id}`, 404))
        return
    }
    if (!result)
        return next(new AppError(`can't find recipe with id = ${id}`, 404))

    res.status(200).json(result)
}

export const showRecipeDetails = async (req, res, next) => {
    const { id } = req.params
    let result = undefined
    try {
        result = await Recipe.findById(id, {
            instructions: 1,
            ingredients: 1,
            createdAt: 1,
            updatedAt: 1,
            _id: 0,
        })
    } catch (err) {
        next(new AppError(`can't find recipe with id = ${id}`, 404))
        return
    }
    if (!result)
        return next(new AppError(`can't find recipe with id = ${id}`, 404))
    res.status(200).json(result)
}

//.....

export const updateRecipe = async (req, res, next) => {
    let { id } = req.params
    let {
        name,
        price,
        chef_name,
        description,
        ingredients,
        instructions,
        cooking_time,
        calories,
    } = req.body
    let recipe = {}
    if (name) recipe.name = name
    if (price) recipe.price = price
    if (chef_name) recipe.chef_name = chef_name
    if (description) recipe.description = description
    if (ingredients) recipe.ingredients = ingredients
    if (instructions) recipe.instructions = instructions
    if (cooking_time) recipe.cooking_time = cooking_time
    if (calories) recipe.calories = calories
    let result = undefined
    try {
        result = await Recipe.findByIdAndUpdate(id, recipe, { new: true })
    } catch (error) {
        next(new AppError(`ID ${id} not found`, 404))
        return
    }
    if (!result) {
        next(new AppError(`ID ${id} not found`, 404))
        return
    }
    res.json(result)
}

export const getChefById = async (req, res, next) => {
    let { chefId } = req.params
    let result = undefined
    console.log(chefId)
    try {
        result = await Chef.findById(chefId)
    } catch (error) {
        next(new AppError(`ID ${chefId} not found`, 404))
        return
    }
    if (!result) {
        next(new AppError(`ID ${chefId} not found`, 404))
        return
    }
    res.json(result)
}

export const createRecipe = async (req, res, next) => {
    let recipe = req.body
    try {
        let result = await Recipe.create(recipe)
        if (!result) {
            next(new AppError(`can't cearte`, 409)) //conflict
            return
        }
        res.status(201).json(result)
    } catch (error) {
        next(new AppError(error, 406)) // not acceptable
        return
    }
}

export const deleteRecipe = async (req, res) => {
    const { id } = req.params
    const recipe = await Recipe.findByIdAndDelete(id)
    if (!recipe) {
        return res.status(404).json({
            message: `Recipe with id ${id} is not found`,
        })
    }
    res.status(200).json({
        message: `Recipe ${recipe.name} with id ${id} has been successfully deleted`,
    })
}

export const getSimilarRecipes = async (req, res) => {
    const { id } = req.params
    const recipe = await Recipe.findById(id)
    if (!recipe) {
        return res.status(404).json({
            message: `Recipe with id ${id} is not found`,
        })
    }
    const recipes = await Recipe.find()
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

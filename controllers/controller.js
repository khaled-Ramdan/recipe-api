import AppError from '../errorHandling/AppError.js';
import { recipes, append_element, getl, chefs } from "../model/model.js";
import { Recipe } from "../model/recipe.js";

export const getRecipe = (req, res) => {
    let { chef_name, sort, filter } = req.query;
    let { id } = req.params;

    let result = recipes;

    if (sort) {
        let sortKey = 1;
        if (sort.startsWith('-')) {
            sortKey = -1;
            sort = sort.substr(1);
        }
        result = result.sort((a, b) => (a[sort] > b[sort] ? sortKey : -sortKey));
    }

    if (chef_name)
        result = result.filter((recipe) => recipe.chef_name == chef_name);

    res.status(200).json(result);
};

export const getRecipeById = (req, res) => {
    let { id } = req.params;
    let result = recipes.filter((recipe) => recipe.id === id);
    res.status(200).json(result);
};

export const updateRecipe = (req, res) => {
    let { id } = req.params;
    let {
        name,
        price,
        chef_name,
        Description,
        Ingredients,
        Instructions,
        cooking_time,
        Calories,
    } = req.body;
    let recipe = -1;
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id == id) {
            recipe = i;
            break;
        }
    }
    if (recipe == -1)
        return res
            .status(404)
            .json({ state: 'failed', message: 'The id is not found' });
    recipes[recipe].name = name == undefined ? recipes[recipe].name : name;
    recipes[recipe].price = price == undefined ? recipes[recipe].price : price;
    recipes[recipe].chef_name =
        chef_name == undefined ? recipes[recipe].chef_name : chef_name;
    recipes[recipe].Description =
        Description == undefined ? recipes[recipe].Description : Description;
    recipes[recipe].Ingredients =
        Ingredients == undefined ? recipes[recipe].Ingredients : Ingredients;
    recipes[recipe].Instructions =
        Instructions == undefined ? recipes[recipe].Instructions : Instructions;
    recipes[recipe].cooking_time =
        cooking_time == undefined ? recipes[recipe].cooking_time : cooking_time;
    recipes[recipe].Calories =
        Calories == undefined ? recipes[recipe].Calories : Calories;
    res.status(200).json(recipes[recipe]);
};

export const getChefById = (req, res) => {
    let { chefId } = req.params;
    let result = chefs.filter((chef) => chef.id === chefId);
    res.json(result);
};

export const createRecipe = (req, res) => {
    let id = recipes.length;
    let {
        name,
        price,
        chef_name,
        Description,
        Ingredients,
        Instructions,
        cooking_time,
        Calories,
    } = req.body;
    if (name == null) {
        res.status(404).json({ state: 'failed', message: 'name is required' });
        return;
    }
    if (price == null) {
        res.status(404).json({ state: 'failed', message: 'price is required' });
        return;
    }
    if (chef_name == null) {
        res.status(404).json({
            state: 'failed',
            message: 'chef name is required',
        });
        return;
    }
    if (Description == null) {
        res.status(404).json({
            state: 'failed',
            message: 'Description is required',
        });
        return;
    }
    if (Ingredients == null) {
        res.status(404).json({
            state: 'failed',
            message: 'Ingredients is required',
        });
        return;
    }
    if (Instructions == null) {
        res.status(404).json({
            state: 'failed',
            message: 'Instructions is required',
        });
        return;
    }
    if (cooking_time == null) {
        res.status(404).json({
            state: 'failed',
            message: 'cooking time is required',
        });
        return;
    }
    if (Calories == null) {
        res.status(404).json({
            state: 'failed',
            message: 'Calories time is required',
        });
        return;
    }
    let x = {};
    x.id = 'id' + (id + 1);
    x.name = name;
    x.price = price;
    x.chef_name = chef_name;
    x.Description = Description;
    x.Ingredients = Ingredients;
    x.Instructions = Instructions;
    x.cooking_time = cooking_time;
    x.Calories = Calories;
    // recipes.push(x);
    append_element(x);

    res.status(200).json(getl());
};

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
        return res.status(404).json({
            message: `Recipe with id ${id} is not found`,
        });
    }
    res.status(200).json({
        message: `Recipe ${recipe.name} with id ${id} has been successfully deleted`,
    });
};

export const getSimilarRecipes = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        return res.status(404).json({
            message: `Recipe with id ${id} is not found`,
        });
    }
    const recipes = await Recipe.find();
    const ingredients = recipe.ingredients;
    const similar = [];
    recipes.forEach((recipe) => {
        if (recipe.id !== id) {
            const similarity = ingredients.reduce((similarity, ingredient) => {
                return similarity + recipe.ingredients.includes(ingredient);
            }, 0);
            if (similarity >= ingredients.length / 2) {
                similar.push(recipe);
            }
        }
    });
    res.status(200).json(similar);
};

export const showRecipeIngredients = (req, res) => {
    const { id } = req.params;
    const recipe = recipes.find((recipe) => recipe.id === id);
    if (!recipe) {
        throw new AppError(`Recipe with id ${id} not found`, 404);
    }
    res.status(200).json({ ingredients: recipe.ingredients });
};

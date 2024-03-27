import express from "express"
import {
    getRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getSimilarRecipes,
    createRecipe,
    showRecipeIngredients,
} from '../controllers/controller.js'

const router = express.Router()

router.route('/').get(getRecipe).post(createRecipe)
router.route('/:id').get(getRecipeById).patch(updateRecipe).delete(deleteRecipe)
router.route('/:id/similar').get(getSimilarRecipes)
router.route('/:id/ingredients').get(showRecipeIngredients)

export default router

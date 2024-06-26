import express from 'express'
import {
    getRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getSimilarRecipes,
    createRecipe,
    showRecipeDetails,
    getChefById,
} from '../controllers/controller.js'

const router = express.Router()

router.route('/').get(getRecipe).post(createRecipe)
router.route('/:id').get(getRecipeById).patch(updateRecipe).delete(deleteRecipe)
router.route('/:id/similar').get(getSimilarRecipes)
router.route('/:id/details').get(showRecipeDetails)
router.route('/chef/:chefId').get(getChefById)

export default router

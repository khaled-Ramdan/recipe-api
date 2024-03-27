import express from "express"
import {
	getRecipe,
	getRecipeById,
	updateRecipe,
	deleteRecipe,
	getSimilarRecipes,
	createRecipe,
} from "../controllers/controller.js"

const router = express.Router()

router.route("/").get(getRecipe).post(createRecipe)
router.route("/:id").get(getRecipeById).patch(updateRecipe).delete(deleteRecipe)
router.route("/:id/similar").get(getSimilarRecipes)

export default router

import express from "express";
import {
    getRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getSimilarRecipes,
} from "../controllers/controller.js";

const router = express.Router();

router.route("/").get(getRecipe);
router.route("/:id/similar").get(getSimilarRecipes);
router.route("/:id")
    .get(getRecipeById)
    .patch(updateRecipe)
    .delete(deleteRecipe);

export default router;
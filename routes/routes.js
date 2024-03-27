import express from "express";
import {
  getRecipe,
  getRecipeById,
  updateRecipe,
  createRecipe,
} from "../controllers/controller.js";

const router = express.Router();

router.route("/").get(getRecipe).post(createRecipe);
router.route("/:id").get(getRecipeById).patch(updateRecipe);

export default router;

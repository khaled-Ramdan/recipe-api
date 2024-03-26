import express from "express"
import { getRecipe, getRecipeById } from "../controllers/controller.js"

const router = express.Router()

router.route("/").get(getRecipe)
router.route("/:id").get(getRecipeById)



export default router
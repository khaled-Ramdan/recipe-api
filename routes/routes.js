import express from "express"
import { testfunction } from "../controllers/controller.js"

const router = express.Router()


router.route("/").get(testfunction)



export default router
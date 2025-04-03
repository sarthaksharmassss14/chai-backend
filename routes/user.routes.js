import { Router } from "express";
import { registeruser } from "../src/controllers/user.controller";

const router = Router()

router.route("/register").post(registeruser)
router.route("/login").post(login)
export default router


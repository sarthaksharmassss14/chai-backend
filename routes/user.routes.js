import { Router } from "express";
import { registeruser } from "../src/controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxcount: 1
        },
        {
            name: "coverimage",
            maxcount: 1
        }
  ]),
      registeruser)


export default router


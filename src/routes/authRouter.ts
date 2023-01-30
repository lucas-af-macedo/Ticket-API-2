import express from "express";
import {
	existEmail,
	signUpValidation,
} from "../middlewares/signUpMiddleware.js";
import { signIn, signUp } from "../controllers/authController.js";
import {
	passwordValidation,
	signInEmailValidation,
	signInValidation,
} from "../middlewares/signInMIddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUpValidation, existEmail, signUp);
authRouter.post(
	"/signin",
	signInValidation,
	signInEmailValidation,
	passwordValidation,
	signIn
);

export default authRouter;

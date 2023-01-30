import prisma from "../database/database.js";
import signUpSchema from "../models/signUpSchema.js";
import { Request, Response, NextFunction } from "express";
import { UserSignUp } from "../protocols/protocols.js";

export async function signUpValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const user = req.body as UserSignUp;

	const validation = signUpSchema.validate(user, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	} else {
		res.locals.user = user;
	}
	next();
}

export async function existEmail(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const user = res.locals.user as UserSignUp;

	try {
		const email = await prisma.users.findFirst({
			where: {
				email: user.email,
			},
		});

		if (!email) {
			next();
		} else {
			res.status(409).send({ message: "Email já cadastrado." });
		}
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

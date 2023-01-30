import prisma from "../database/database.js";
import bcrypt from "bcrypt";
import signInSchema from "../models/signInShema.js";
import { Request, Response, NextFunction } from "express";
import { UserSignIn, UserSignInWithId } from "../protocols/protocols.js";

export async function signInEmailValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const signIn = res.locals.signIn as UserSignIn;

	try {
		const email = await prisma.users.findFirst({
			where: {
				email: signIn.email,
			},
		});

		if (email) {
			res.locals.user = email;
			next();
		} else {
			res.status(401).send({ message: "Usuário e/ou senha inválidos!" });
		}
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

export async function passwordValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const signIn = res.locals.signIn as UserSignInWithId;
	const password = res.locals.user.password;

	try {
		if (bcrypt.compareSync(signIn.password, password)) {
			next();
		} else {
			res.status(401).send({ message: "Usuário e/ou senha inválidos!" });
		}
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

export async function signInValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const signIn = req.body as UserSignIn;

	const validation = signInSchema.validate(signIn, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	} else {
		res.locals.signIn = signIn;
	}
	next();
}

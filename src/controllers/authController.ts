import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import authService from "../services/authService.js";
import { UserSignInWithId, UserSignUp } from "../protocols/protocols.js";

export async function signUp(req: Request, res: Response) {
	const user = res.locals.user as UserSignUp;

	const passwordHash = cryptPassword(user.password);

	try {
		await authService.insertUser(user.name, user.email, passwordHash);
		res.sendStatus(201);
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

function cryptPassword(password: string): string {
	return bcrypt.hashSync(password, 10);
}

export async function signIn(req: Request, res: Response) {
	const user = res.locals.user as UserSignInWithId;
	const token = uuid() as string;

	try {
		await authService.insertSession(user.id, token);

		res.status(200).send({ token });
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

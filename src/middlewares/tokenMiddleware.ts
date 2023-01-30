import prisma from "../database/database.js";
import { Request, Response, NextFunction } from "express";

export async function tokenValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.replace("Bearer ", "") as string;

	try {
		const user = await prisma.sessions.findFirst({
			where: {
				token: token,
			},
		});

		if (user) {
			res.locals.userId = user.userId;
			next();
		} else {
			res.sendStatus(401);
		}
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

import { sessions } from "@prisma/client";
import prisma from "../database/database.js";

async function insertUser(name: string, email: string, password: string) {
	await prisma.users.create({
		data: {
			name: name,
			email: email,
			password: password,
		},
	});
}

async function getSession(userId: number): Promise<sessions> {
	return await prisma.sessions.findFirst({
		where: {
			userId: userId,
		},
	});
}

async function deleteSession(userId: number) {
	await prisma.sessions.deleteMany({
		where: {
			userId: userId,
		},
	});
}

async function insertSession(userId: number, token: string) {
	await prisma.sessions.create({
		data: {
			userId: userId,
			token: token,
		},
	});
}

const authRepository = {
	insertUser,
	getSession,
	deleteSession,
	insertSession,
};

export default authRepository;

import authRepository from "../repositories/authRepository.js";

async function insertUser(name: string, email: string, password: string) {
	await authRepository.insertUser(name, email, password);
}

async function insertSession(userId: number, token: string) {
	const oldSession = await authRepository.getSession(userId);

	if (oldSession) {
		await authRepository.deleteSession(userId);
	}

	await authRepository.insertSession(userId, token);
}

const authService = {
	insertUser,
	insertSession,
};

export default authService;

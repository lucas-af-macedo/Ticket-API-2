import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	let event = await prisma.users.findFirst();
	if (!event) {
		const id = await prisma.users.create({
			data: {
				name: "Lucas",
				email: "lucas@macedo.com",
				password:
					"$2b$10$0McJx55rgO/hLf7SpP8./uAfrosoY5OLQeDSACHoLo1Q8bquvulnu",
			},
		});
		await prisma.sessions.create({
			data: {
				userId: id.id,
				token: "$2b$10$0McJx55rgO/hLf7SpP8./uAfrosoY5OLQeDSACHoLo1Q8bquvulnu",
			},
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

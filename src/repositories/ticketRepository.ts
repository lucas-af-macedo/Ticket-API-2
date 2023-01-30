import prisma from "../database/database.js";
import { Seat } from "../protocols/protocols.js";

export async function postTicketRepository(
	seatId: number,
	tripId: number,
	name: string
) {
	await prisma.seat.update({
		where: {
			id: seatId,
		},
		data: {
			occupied: true,
		},
	});

	await prisma.ticket.create({
		data: {
			seatId: seatId,
			tripId: tripId,
			name: name,
		},
	});
}

export async function deleteTicketRepository(id: number) {
	await prisma.seat.update({
		where: {
			id: id,
		},
		data: {
			occupied: false,
		},
	});

	await prisma.ticket.deleteMany({
		where: {
			seatId: id,
		},
	});
}

export async function modifyNameRepository(id: number, name: string) {
	await prisma.ticket.updateMany({
		where: {
			seatId: id,
		},
		data: {
			name: name,
		},
	});
}

export async function getTicketRepository(id: number): Promise<Seat> {
	const seat = await prisma.seat.findFirst({
		where: {
			id: id,
		},
		select: {
			id: true,
			tripId: true,
			seatNumber: true,
			occupied: true,
			ticket: {
				select: {
					name: true,
				},
			},
		},
	});
	return seat;
}

export async function getAllTicketFromTripRepository(
	tripId: number
): Promise<Seat[]> {
	const seat = prisma.seat.findMany({
		where: {
			tripId: tripId,
		},
	});
	return seat;
}

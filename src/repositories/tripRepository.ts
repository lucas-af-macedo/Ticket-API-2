import { trip } from "@prisma/client";
import prisma from "../database/database.js";
import connection from "../database/database.js";
import {
	ManySeats,
	TripObject,
	TripObjectRepository,
	tripRepository,
} from "../protocols/protocols.js";

export async function postTripRepository(trip: TripObject, userId: number) {
	const id: number = (
		await prisma.trip.create({
			data: {
				to: trip.to,
				by: trip.by,
				date: trip.date,
				userId: userId,
			},
		})
	).id;

	let seatNumber: number;
	let array = [] as ManySeats[];

	for (seatNumber = 1; seatNumber <= trip.seats; seatNumber++) {
		array.push({
			seatNumber: seatNumber,
			tripId: id,
		});
	}
	await prisma.seat.createMany({
		data: array,
	});
}

export async function deleteTripRepository(id: number) {
	await prisma.ticket.deleteMany({
		where: {
			tripId: id,
		},
	});

	await prisma.seat.deleteMany({
		where: {
			tripId: id,
		},
	});

	await prisma.trip.delete({
		where: {
			id: id,
		},
	});
}

export async function getTripRepository(id: number): Promise<trip> {
	const trip = await prisma.trip.findFirst({
		where: {
			id: id,
		},
	});
	return trip;
}

export async function getAllTripRepository(): Promise<trip[]> {
	const trip = await prisma.trip.findMany({});
	return trip;
}

export async function tripExistsRepository(id: number): Promise<trip> {
	const trip = await prisma.trip.findFirst({
		where: {
			id: id,
		},
	});
	return trip;
}

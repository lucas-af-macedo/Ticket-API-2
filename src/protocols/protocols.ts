type TripObject = {
	to: string;
	by: string;
	date: string;
	seats: number;
};

type Name = {
	name: string;
};

type TripObjectRepository = {
	id: number;
	to: string;
	by: string;
	date: string;
	seatsAvaible: number;
};

type tripRepository = Omit<TripObjectRepository, "seatsAvaible">;

type SeatTicket = {
	id: number;
	seatNumber: number;
	tripId: number;
	occupied: boolean;
	name: string;
};

type UserSignUp = {
	name: string;
	email: string;
	password: string;
};

type UserSignIn = Omit<UserSignUp, "name">;

type UserSignInWithId = UserSignIn & { id: number };

type Seat = Omit<SeatTicket, "name">;

type ManySeats = {
	seatNumber: number;
	tripId: number;
};

export {
	TripObject,
	TripObjectRepository,
	Name,
	SeatTicket,
	Seat,
	tripRepository,
	UserSignUp,
	UserSignIn,
	UserSignInWithId,
	ManySeats,
};

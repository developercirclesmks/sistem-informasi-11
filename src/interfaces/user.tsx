import { Timestamp } from "firebase/firestore";

export interface IUser {
	uid: string;
	email: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Timestamp | null;
	phoneNumber: string;
	role: "user" | "admin";
	gender: "male" | "female" | "not-set";
	institution: string;
	occupation: string;
	createdAt: Timestamp;
}

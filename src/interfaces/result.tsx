import { Timestamp } from "firebase/firestore";
import { IExam } from "./exam";
import { IUser } from "./user";

export interface IExamResult {
	id: string;
	exam: IExam;
	user: IUser;
	score: number;
	createdAt: Timestamp;
}

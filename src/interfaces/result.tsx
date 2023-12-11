import { Timestamp } from "firebase/firestore";
import { IExam } from "./exam";
import { IUser } from "./user";

export interface IResult {
	id: string;
	examId: IExam;
	userId: IUser;
	score: number;
	createdAt: Timestamp;
}

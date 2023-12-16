import { Timestamp } from "firebase/firestore";
import { IQuestion } from "./question";

export interface IExam {
	id: string;
	name: string;
	questionList: IQuestion[];
	desc: string;
  createdAt: Timestamp;
	startedAt: Timestamp | null;
	endedAt: Timestamp | null;
	totalDuration: number;
}

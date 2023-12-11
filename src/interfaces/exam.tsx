import { Timestamp } from "firebase/firestore";
import { IOption } from "./option";

export interface IExam {
	id: string;
	name: string;
	optionsList: IOption;
	createdAt: Timestamp;
	isStarted: boolean;
}

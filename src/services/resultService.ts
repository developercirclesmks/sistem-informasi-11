import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	setDoc,
	Timestamp,
	where,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { IExamResult } from "../interfaces/result";


export const getAllResults = async (): Promise<IExamResult[]> => {
	try {
		const querySnapshot = await getDocs(collection(db, "results"));
		const results: IExamResult[] = [];

		querySnapshot.forEach((doc) => {
			const resultData = doc.data() as IExamResult; // Explicitly cast to IExamResult
			results.push({ ...resultData, id: doc.id });
		});

		return results;
	} catch (error) {
		console.error("Error getting exam results:", error);
		throw new Error("Failed to get exam results");
	}
};


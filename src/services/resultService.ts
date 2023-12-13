import {
	collection,
	doc,
	getDocs,
	QueryDocumentSnapshot,
	QuerySnapshot,
	setDoc,
	Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { IExamResult } from "../interfaces/result";

export const setResult = async (
	examId: string,
	userId: string,
	examResultData: IExamResult
): Promise<void> => {
	try {
		const resultId = `${examId}_${userId}`;
		const resultRef = doc(db, "results", resultId);

		await setDoc(resultRef, {
			...examResultData,
			createdAt: Timestamp.now(), // Assign the current timestamp
		});
	} catch (error) {
		console.error("Error setting exam result:", error);
		throw new Error("Failed to set exam result");
	}
};

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

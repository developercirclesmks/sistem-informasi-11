import { questionList } from "./../components/_question-data";
import {
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { IExam } from "../interfaces/exam";
import { showToast } from "../components/atoms/Toasts/Toasts";

export async function createExam(exam: Omit<IExam, "id">): Promise<void> {
	try {
		const examsCollection = collection(db, "exams"); // Change 'exams' to your Firestore collection name

		const newExamRef = await addDoc(examsCollection, {
			name: exam.name,
			questionList: exam.questionList,
			desc: exam.desc,
			createdAt: exam.createdAt,
			startedAt: exam.startedAt,
			endedAt: exam.endedAt,
			totalDuration: exam.totalDuration,
		});

		const newExamId = newExamRef.id;

		console.log("Exam created successfully with ID:", newExamId);
	} catch (error) {
		console.error("Error creating exam:", error);
		throw new Error("Failed to create exam.");
	}
}

export const updateExam = async ({
	id,
	exam,
}: {
	id: string;
	exam: Partial<
		Omit<IExam, "id" | "createdAt" | "updatedAt" | "questionList" | "result">
	>;
}) => {
	try {
		const examDocRef = doc(db, "exams", id);
		const currentExamSnapshot = await getDoc(examDocRef);

		if (currentExamSnapshot.exists()) {
			const currentExamData = currentExamSnapshot.data();
			const updatedExamData = {
				...currentExamData,
				...exam,
			};

			await updateDoc(examDocRef, updatedExamData);
		} else {
			throw new Error("Exam does not exist");
		}
	} catch (error) {
		throw new Error("Failed to update exam: " + error);
	}
};

export async function getOneExam(examId: string): Promise<IExam | undefined> {
	try {
		const examDocRef = doc(collection(db, "exams"), examId);
		const examSnapshot = await getDoc(examDocRef);

		if (examSnapshot.exists()) {
			const examData = examSnapshot.data();
			const exam: IExam = {
				id: examSnapshot.id,
				name: examData.name,
				questionList: examData.questionList,
				desc: examData.desc,
				createdAt: examData.createdAt,
				startedAt: examData.startedAt,
				endedAt: examData.endedAt,
				totalDuration: examData.totalDuration,
			};
			return exam;
		} else {
			showToast("error", "No such exam exists!");
			return undefined;
		}
	} catch (error) {
		console.error("Error fetching exam:", error);
		throw new Error("Failed to fetch exam.");
	}
}

export const getAllExam = async () => {
	const querySnapshot = await getDocs(collection(db, "exams"));
	const exams: IExam[] = [];

	const examPromises = querySnapshot.docs.map((doc) => {
		const data = doc.data();

		data.createdAt = data.createdAt && data.createdAt.toDate();

		return { ...data, id: doc.id } as IExam;
	});

	const examResult = await Promise.all(examPromises);
	exams.push(...examResult);

	return exams;
};

export const deleteExam = async (id: string) => {
	try {
		const docRef = doc(db, "exams", id);

		const examSnapshot = await getDoc(docRef);
		if (examSnapshot.exists()) {

			const resultsRef = collection(db, "results");
			const querySnapshot = await getDocs(resultsRef);

			const deletePromises = querySnapshot.docs
				.filter((doc) => doc.data().examid === id)
				.map(async (doc) => {
					await deleteDoc(doc.ref);
				});

			await Promise.all(deletePromises);

			await deleteDoc(docRef);
		} else {
			showToast("error", "Exam not found!");
		}
	} catch (error) {
		console.error("Error deleting exam:", error);
		showToast("error", "Error Deleting Exam");
		throw new Error("Failed to delete exam.");
	}
};

export const startExam = async (
	examId: string,
	totalDurationMinutes: number
): Promise<void> => {
	try {
		const examDocRef = doc(db, "exams", examId);
		const examSnapshot = await getDoc(examDocRef);

		if (examSnapshot.exists()) {
			const { startedAt } = examSnapshot.data();

			const startedAtTimestamp = Timestamp.now();
			const endedAtTimestamp =
				startedAtTimestamp.toMillis() + totalDurationMinutes * 60 * 1000;

			if (!startedAt || startedAt.toMillis() > Timestamp.now().toMillis()) {
				// Update startedAt and endedAt
				await updateDoc(examDocRef, {
					startedAt: startedAtTimestamp,
					endedAt: new Timestamp(endedAtTimestamp / 1000, 0),
				});

				showToast("success", "Exam started successfully.");
			} else {
				showToast("error", "Exam Already Started");
				throw new Error("Exam has already started.");
			}
		} else {
			throw new Error("Exam not found.");
		}
	} catch (error) {
		console.error("Error starting exam:", error);
		showToast("error", "Error Starting Exam"); // Display the error message from the catch block
		throw new Error("Failed to .");
	}
};

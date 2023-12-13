import {
	FieldValue,
	addDoc,
	collection,
	doc,
	getDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { IQuestion } from "../interfaces/question";
import { showToast } from "../components/atoms/Toasts/Toasts";
import { IExam } from "../interfaces/exam";

export async function createQuestion(
	question: IQuestion,
	examId: string
): Promise<void> {
	try {
		const examDocRef = doc(db, "exams", examId);
		const examDocSnap = await getDoc(examDocRef);

		if (examDocSnap.exists()) {
			const examData = examDocSnap.data();
			const updatedQuestionList = [
				...(examData.questionList ?? []),
				{
					name: question.name,
					optionList: question.optionList.map((option, index) => ({
						optionLabel: String.fromCharCode(65 + index),
						name: option.name,
						iscorrect: option.iscorrect,
					})),
					correctAnswer: question.correctAnswer,
				},
			];

			await updateDoc(examDocRef, { questionList: updatedQuestionList });

			showToast(
				"success",
				`Question added successfully to Exam with ID: ${examId}`
			);
		} else {
			showToast("error", "Exam not found");
			throw new Error("Exam not found");
		}
	} catch (error) {
		showToast("error", `Error adding question: ${error}`);
		throw new Error("Failed to add question to the exam.");
	}
}
export const updateQuestionInExam = async (
  examId: string,
  questionIndex: number,
  updatedQuestion: Partial<Omit<IQuestion, "correctAnswer">>
): Promise<boolean> => {
  try {
    const examDocRef = doc(db, "exams", examId);
    const currentExamSnapshot = await getDoc(examDocRef);

    if (currentExamSnapshot.exists()) {
      const currentExamData = currentExamSnapshot.data() as IExam;

      const updatedQuestionList = [...currentExamData.questionList];
      const questionToUpdate = { ...updatedQuestionList[questionIndex], ...updatedQuestion };

      updatedQuestionList[questionIndex] = questionToUpdate;

      await updateDoc(examDocRef, { questionList: updatedQuestionList });

      return true;
    } else {
      throw new Error("Exam does not exist");
    }
  } catch (error) {
    console.error("Failed to update question:", error);
    return false; 
  }
};


export const deleteQuestionInExam = async (
  examId: string,
  questionIndex: number
): Promise<boolean> => {
  try {
    const examDocRef = doc(db, "exams", examId);
    const currentExamSnapshot = await getDoc(examDocRef);

    if (currentExamSnapshot.exists()) {
      const currentExamData = currentExamSnapshot.data() as IExam;

      // Create a copy of the questionList and remove the specified question
      const updatedQuestionList = [...currentExamData.questionList];
      updatedQuestionList.splice(questionIndex, 1);

      // Update the exam document with the modified questionList (deleted question)
      await updateDoc(examDocRef, { questionList: updatedQuestionList });

      return true; // Successfully deleted the question
    } else {
      throw new Error("Exam does not exist");
    }
  } catch (error) {
    console.error("Failed to delete question:", error);
    return false; // Failed to delete the question
  }
};
// export const updateQuestion = async ({
// 	id,
// 	question,
// }: {
// 	id: string;
// 	question: Partial<Omit<IQuestion, "examId">>;
// }) => {
// 	try {
// 		const questionDocRef = doc(db, "question", id);
// 		const currentQuestionSnapshot = await getDoc(questionDocRef);

// 		if (currentQuestionSnapshot.exists()) {
// 			const currentQuestionData = currentQuestionSnapshot.data();
// 			const updatedQuestionData = {
// 				...currentQuestionData,
// 				...question,
// 			};

// 			await updateDoc(questionDocRef, updatedQuestionData);
// 		} else {
// 			throw new Error("Question does not exist");
// 		}
// 	} catch (error) {
// 		showToast("error", `Failed to update Question: ${error}`);
// 		throw new Error("Failed to update Question: " + error);
// 	}
// };

export const getOneQuestionService = (
	exam: IExam,
	index: number
): IQuestion | undefined => {
	if (
		exam &&
		exam.questionList &&
		index >= 0 &&
		index < exam.questionList.length
	) {
		return exam.questionList[index];
	}
	return undefined;
};

import React, { useState, ChangeEvent, useEffect } from "react";
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonItem,
	IonTextarea,
	IonIcon,
	IonSelect,
	IonSelectOption,
	IonText,
} from "@ionic/react";

import style from "./AdminQuestionCard.module.css";
import {
	deleteQuestionInExam,
	updateQuestionInExam,
} from "../../../services/questionService";
import { showToast } from "../../atoms/Toasts/Toasts";
import { close } from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import { IExam } from "../../../interfaces/exam";
import { getOneExam } from "../../../services/examService";

interface EditQuestionCardProps {
	examId: string;
}

interface RouteParams {
	index: string;
}

const EditQuestionCard: React.FC<EditQuestionCardProps> = ({ examId }) => {
  const history = useHistory();
  const { index } = useParams<RouteParams>();
  const questionNum = index ? parseInt(index) : 1;

	const [question, setQuestion] = useState<string | undefined>("");
	const [options, setOptions] = useState(["", ""]);
	const [correctAnswer, setCorrectAnswer] = useState<number | undefined>(
		undefined
	);

	const [loading, setLoading] = useState<boolean>(false);
	const [exam, setExam] = useState<IExam | undefined>(undefined);

	useEffect(() => {
		const fetchExam = async () => {
			try {
				setLoading(true);
				const fetchedExam = await getOneExam(examId);
				if (fetchedExam) {
					setExam(fetchedExam);
					const fetchedQuestion = fetchedExam.questionList[questionNum - 1];

					const defaultQuestion = fetchedQuestion.name;

					const defaultOptions = fetchedQuestion.optionList.map(
						(option) => option.name
					);

					const correctAnswerIndex = fetchedQuestion.optionList.findIndex(
						(option) => option.iscorrect
					);

					setQuestion(defaultQuestion);
					setOptions(defaultOptions);
					setCorrectAnswer(correctAnswerIndex);
				} else {
					showToast("error", "Exam not found");
				}
			} catch (error) {
				showToast("error", "Invalid Question Number");
			} finally {
				setLoading(false);
			}
		};
		fetchExam();
	}, [examId, questionNum]);

	const handleOptionChange = (index: number, value: string) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	const addOption = () => {
		if (options.length < 5) {
			setOptions([...options, ""]);
		}
	};

	const deleteOption = (index: number) => {
		const newOptions = [...options];
		newOptions.splice(index, 1);
		setOptions(newOptions);
	};

	const isSaveButtonDisabled =
		question === "" ||
		options.some((opt) => opt === "") ||
		correctAnswer === null;

	const handleSaveChanges = async () => {
		try {
			const updatedQuestionData = {
				name: question,
				optionList: options.map((option, index) => ({
					optionLabel: String.fromCharCode(65 + index),
					name: option,
					iscorrect: index === correctAnswer,
				})),
			};

			const isUpdated = await updateQuestionInExam(
				examId,
				questionNum - 1,
				updatedQuestionData
			);

			if (isUpdated) {
				showToast("success", "Question Updated");
				history.push(`/exam/${examId}/edit`)
			} else {
				showToast("error", "Failed to update question");
			}
		} catch (error) {
			showToast("error", "Failed to update question");
		}
	};

	const handleDeleteQuestion = async () => {
		if (exam?.questionList.length === 1) {
			showToast("error", "Exam Must Have At Least 1 Question");
			return;
		}

		try {
			const isDeleted = await deleteQuestionInExam(examId, questionNum - 1);

			if (isDeleted) {
				showToast("plain", "Question Deleted");
				history.push(`/exam/${examId}/edit`);
			} else {
				showToast("error", "Failed to update question");
			}
		} catch (error) {
			showToast("error", "Failed to delete question");
		}
	};

	return (
		<IonCard className={`${style.cardmain} noMargin`}>
			<IonCardHeader>Exam : EDIT {}</IonCardHeader>
			<IonCardContent>
				<IonTextarea
					autoGrow
					fill="outline"
					label="Enter Question Here"
					labelPlacement="floating"
					counter
					value={question}
					onIonInput={(e) => setQuestion(e.detail.value!)}
					placeholder="Enter Question"
				></IonTextarea>
				{options.map((option, index) => (
					<IonCardContent key={index} className={` ${style.option}`}>
						<div className={style.optionRow}>
							<div className={style.optionlabel}>
								{String.fromCharCode(65 + index)}
							</div>
							<IonTextarea
								className={`optionInput ${style.textInput}`}
								placeholder={`Option ${index + 1}`}
								required
								value={option}
								onIonChange={(e) => handleOptionChange(index, e.detail.value!)}
							></IonTextarea>
						</div>

						{index > 1 && (
							<div className={style.deleteBtn}>
								<IonButton
									fill="clear"
									color={"dark"}
									size="small"
									onClick={() => deleteOption(index)}
								>
									<IonIcon icon={close} color="dark" />
								</IonButton>
							</div>
						)}
					</IonCardContent>
				))}
				<IonButton
					fill="clear"
					onClick={addOption}
					color={options.length < 5 ? "primary" : "primary"}
					disabled={options.length >= 5}
				>
					{options.length < 5 ? "Add Option +" : "Options Capped At 5"}
				</IonButton>
				<section>
					<IonItem>
						<IonSelect
							value={correctAnswer}
							onIonChange={(e) => setCorrectAnswer(e.detail.value)}
							placeholder="Select Correct Answer"
						>
							{options.map((_, index) => (
								<IonSelectOption key={index} value={index}>
									{String.fromCharCode(65 + index)}
								</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
				</section>
				<section className={`ion-padding ${style.buttons}`}>
					<IonButton
						className={`extra-light ${style.bold}`}
						disabled={isSaveButtonDisabled}
						onClick={handleSaveChanges}
					>
						Save Changes
					</IonButton>
					<IonButton
						className={`extra-light ${style.bold}`}
						fill="outline"
						onClick={handleDeleteQuestion}
					>
						Delete
					</IonButton>
				</section>
			</IonCardContent>
		</IonCard>
	);
};

export default EditQuestionCard;

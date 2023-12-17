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
import { createQuestion } from "../../../services/questionService";
import { IQuestion } from "../../../interfaces/question";
import { showToast } from "../../atoms/Toasts/Toasts";
import { close } from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface CreateQuestionCardProps {
	ExamId: string;
}

const CreateQuestionCard: React.FC<CreateQuestionCardProps> = ({ ExamId }) => {
	const history = useHistory();

	const [question, setQuestion] = useState<string>("");
	const [options, setOptions] = useState(["", ""]);
	const [correctAnswer, setCorrectAnswer] = useState<number | undefined>(
		undefined
	);

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
		correctAnswer === null ||
		correctAnswer === undefined;

	const handleSaveQuestion = async () => {
		if (
			correctAnswer !== undefined &&
			correctAnswer >= 0 &&
			correctAnswer <= options.length - 1 // Updated to check against the number of options
		) {
			const newQuestion: IQuestion = {
				name: question,
				optionList: options.map((opt, index) => ({
					optionLabel: String.fromCharCode(65 + index),
					name: opt,
					iscorrect: correctAnswer === index,
				})),
				correctAnswer: correctAnswer,
			};

			try {
				await createQuestion(newQuestion, ExamId);
				showToast("success", "Question created successfully");
				history.push(`/exam/${ExamId}/edit`);
			} catch (error) {
				showToast("error", `Error creating question: ${error}`);
			}
		} else {
			showToast("error", "Please select a correct answer");
		}
	};

	return (
		<IonCard className={`${style.cardmain} noMargin`}>
			<IonCardContent>
				<IonTextarea
					autoGrow
					fill="outline"
					label="Enter Question Here"
					labelPlacement="floating"
					counter
					value={question}
					onIonChange={(e) => setQuestion(e.detail.value!)}
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
						onClick={handleSaveQuestion}
					>
						Save Question
					</IonButton>
					<IonButton
						className={`extra-light ${style.bold}`}
						fill="outline"
						onClick={() => history.push(`/exam/${ExamId}/edit`)}
					>
						Cancel
					</IonButton>
				</section>
			</IonCardContent>
		</IonCard>
	);
};

export default CreateQuestionCard;

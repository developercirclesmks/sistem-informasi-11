import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCol,
	IonInput,
	IonItem,
	IonLabel,
	IonText,
	IonTextarea,
} from "@ionic/react";
import React, { useState, ChangeEvent, useEffect } from "react";
import style from "./QuestionCard.module.css";

const QuestionCard: React.FC = () => {
	const [questionTitle, setQuestionTitle] = useState("");

	const handleQuestionChange = (e: CustomEvent) => {
		const newValue = e.detail.value as string;
		setQuestionTitle(newValue);
		console.log("Hai");
	};

	useEffect(() => {
		console.log(questionTitle);
	}, [questionTitle]);

	return (
		<IonCard className={`ion-padding ${style.cardmain}`} color="">
			<IonCardContent>
				<IonCol className={style.column}>
					<IonTextarea
						autoGrow
						fill="solid"
						label="Enter Your Question :"
						labelPlacement="floating"
						onIonInput={(e) => setQuestionTitle(e.detail.value!)}
					></IonTextarea>

					<IonButton
						expand="full"
						disabled
						onClick={() => console.log(questionTitle)}
					>
						Submit
					</IonButton>
				</IonCol>
			</IonCardContent>
		</IonCard>
	);
};

export default QuestionCard;

import React from "react";
import style from "./QuestionCard.module.css";
import {
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonCol,
	IonRow,
	IonText,
	IonItem,
	IonButton,
} from "@ionic/react";
import { IExam } from "../../../interfaces/exam";

interface QuestionCardProps {
	exam: IExam;
	QIndex: number;
	onSelectedOptionsChange: (QIndex: number, optionIndex: number) => void;
	selectedIndex: number | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	exam,
	QIndex,
	onSelectedOptionsChange,
	selectedIndex,
}) => {
	const handleOptionClick = (optionIndex: number) => {
		onSelectedOptionsChange(QIndex, optionIndex); // Call the function prop to pass updatedOptions to the parent component
	};

	return (
		<IonCard className={`${style.cardmain}`}>
			<IonCardContent className="">
				<IonText>No.{QIndex + 1}</IonText>
				<IonCol>
					<IonRow>
						<IonText>Question :</IonText>
					</IonRow>
					<IonRow className="ion-padding">
						<IonText color={"dark"}>{exam.questionList[QIndex].name}</IonText>
					</IonRow>

					<section className="ion-padding">
						{exam.questionList[QIndex].optionList.map((optionId, index) => (
							<IonItem
								lines="none"
								button
								className={style.option}
								key={index}
								onClick={() => handleOptionClick(index)}
							>
								<IonButton
									color={"primary"}
									className={style.optionlabel}
									fill={index === selectedIndex ? "solid" : "outline"}
								>
									{String.fromCharCode(65 + index)}
								</IonButton>
								<IonText className={`ion-padding ${style.optionText}`}>
									{exam.questionList[QIndex].optionList[index].name}
								</IonText>
							</IonItem>
						))}
					</section>
				</IonCol>
			</IonCardContent>
		</IonCard>
	);
};

export default QuestionCard;

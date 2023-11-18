import {
	IonButton,
	IonCol,
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import style from "./styles/OnExam.module.css";
import QuestionCard from "../components/molecules/QuestionCard/QuestionCard";
import { questionList, randomOption } from "../components/_question-data";
import { useRef } from "react";

const OnExam: React.FC = () => {
	const { examId } = useParams<{ examId: string }>();
  const scrollRef = useRef<HTMLIonColElement>(null);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

	return (
		<PageContainer nopadding>
			<main className={` ${style.main}`}>
				<aside className={style.aside}>
					<IonItem className="">
						<IonLabel className="item-text-wrap">Exam Title</IonLabel>
					</IonItem>
					<section className={`ion-padding ${style.numberGrid}`}>
						{questionList.map((question, index) => (
							<div className={style.numberButton}>
								<IonButton onClick={() => scrollToElement(question.questionId)} fill="outline" color={"primary"}>
									{index+1}
								</IonButton>
							</div>
						))}
					</section>
				</aside>
				<section className={`ion-padding ${style.scrollContent}`}>
					<main className={style.content}>
						<IonCol ref={scrollRef}>
							{questionList.map((question) => {
								return (
									<QuestionCard
										key={question.questionId}
										questionName={question.questionTitle}
										optionIdarray={question.optionId}
										questionId={question.questionId}
									/>
								);
							})}
						</IonCol>
					</main>
				</section>
			</main>
		</PageContainer>
	);
};

export default OnExam;

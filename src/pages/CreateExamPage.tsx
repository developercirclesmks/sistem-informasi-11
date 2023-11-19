import React, { useState, ReactElement } from "react";
import { IonButton, IonCol, IonItem, IonLabel } from "@ionic/react";
import PageContainer from "../components/PageContainer";
import style from "./styles/CreateExamPage.module.css";
import CreateQuestionCard from "../components/molecules/CreateQuestionCard/CreateQuestionCard";
import { nanoid } from "nanoid";
// ... (previous code)

const CreateExamPage: React.FC = () => {
	const [questions, setQuestions] = useState<ReactElement[]>([]);

	const addNewQuestion = () => {
		const questionId = nanoid();
		const newQuestions: ReactElement[] = [
			...questions,
			<CreateQuestionCard
				id={questionId}
				questionNumber={questions.length + 1}
				key={questionId}
				onDelete={() => handleDeleteQuestion(questionId)}
				questionId={questionId}
			/>,
		];
		setQuestions(newQuestions);
	};

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions((prev) =>
      prev
        .filter((el) => el.key !== questionId)
        .map((question, index) => ({
          ...question,
          props: {
            ...question.props,
            questionNumber: index + 1,
          },
        }))
    );
  };

	const handlescroll = (scrollId: string) => {
		const scrollTo = document.getElementById(scrollId);
		if (scrollTo) {
			scrollTo.scrollIntoView({ behavior: "smooth" });
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
						{questions.map((question, index) => (
							<div className={style.numberButton} key={index}>
								<IonButton
									onClick={() => handlescroll(question.props.questionId)}
									fill="outline"
									color={"primary"}
								>
									{index + 1}
								</IonButton>
							</div>
						))}
					</section>
				</aside>
				<section className={`${style.scrollContent}`}>
					<IonCol className={`ion-padding ${style.content}`}>
						{questions.map((question, index) => (
							<React.Fragment key={index}>{question}</React.Fragment>
						))}
						<IonButton className="semibold" fill="clear" onClick={addNewQuestion}>
							New Question +
						</IonButton>
					</IonCol>
				</section>
			</main>
		</PageContainer>
	);
};

export default CreateExamPage;

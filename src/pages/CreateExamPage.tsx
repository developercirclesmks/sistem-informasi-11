import React, { useState, ReactElement } from "react";
import { IonButton, IonCol, IonItem, IonLabel } from "@ionic/react";
import PageContainer from "../components/PageContainer";
import style from "./styles/CreateExamPage.module.css";
import QuestionCard from "../components/molecules/QuestionCard/QuestionCard";
import { nanoid } from "nanoid";
// ... (previous code)

const CreateExamPage: React.FC = () => {
  const [questions, setQuestions] = useState<ReactElement[]>([]);
  const [questionCounter, setQuestionCounter] = useState(1);


  const addNewQuestion = () => {
    const questionId = nanoid();
    const newQuestions: ReactElement[] = [
      ...questions,
      <QuestionCard
        id={questionId}
        questionNumber={questionCounter}
        key={questionId}
        onDelete={() => handleDeleteQuestion(questionId)}
        questionId={questionId}
      />,
    ];
    setQuestions(newQuestions);
    setQuestionCounter(questionCounter + 1);
  };

  const handleDeleteQuestion = (questionId: string) => {
    console.log(questionId);
    // const newQuestions = questions.filter(
    //   (question) => (question.props).questionId !== questionId
    // );
    setQuestions(prev => prev.filter(el => el.key !== questionId));
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
                  onClick={() => handlescroll((question.props).questionId)}
                  fill="outline"
                  color={"primary"}
                >
                  {index + 1}
                </IonButton>
              </div>
            ))}
          </section>
        </aside>
        <section className={`ion-padding ${style.scrollContent}`}>
          <main className={style.content}>
            <IonCol>
              {questions.map((question, index) => (
                <React.Fragment key={index}>{question}</React.Fragment>
              ))}
              <IonButton
                className="ion-padding"
                fill="clear"
                onClick={addNewQuestion}
              >
                New Question +
              </IonButton>
            </IonCol>
          </main>
        </section>
      </main>
    </PageContainer>
  );
};

export default CreateExamPage;

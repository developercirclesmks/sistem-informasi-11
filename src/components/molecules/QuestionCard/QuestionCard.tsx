import React, { useState } from "react";
import style from "./QuestionCard.module.css";
import { IonCard, IonCardHeader, IonCardContent, IonCol, IonRow, IonText, IonItem, IonButton } from "@ionic/react";
import { randomOption } from "../../_question-data";

interface QuestionCardProps {
  questionId: string;
  questionName: string;
  optionIdarray: string[];
}

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
	const { questionId, questionName, optionIdarray } = props;

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getOptionLabel = (optionId: string) => {
    const foundOption = randomOption.find((opt) => opt.optionId === optionId);
    return foundOption ? foundOption.optionLabel : "";
  };

  const handleOptionClick = (optionId: string) => {
    if (selectedOption === optionId) {
      setSelectedOption(null); // Toggle back to null if the same option is clicked again
    } else {
      setSelectedOption(optionId); // Set the clicked option as selected
    }
  };

  return (
    <IonCard id={questionId} className={`${style.cardmain}`}>
      <IonCardHeader>Question : {questionId}</IonCardHeader>
      <IonCardContent className="">
        <IonCol>
          <IonRow className="">
            <IonText>{questionName}</IonText>
          </IonRow>

          <section className="ion-padding">
            {optionIdarray.map((optionId, index) => (
              <IonItem
							lines="none"
                button
                className={style.option}
                key={index}
                onClick={() => handleOptionClick(optionId)}
              >
                <IonButton
                  fill={selectedOption === optionId ? "solid" : "outline"}
                  color={"primary"}
                  className={style.optionlabel}
                >
                  {String.fromCharCode(65 + index)}
                </IonButton>
                <IonText className={`ion-padding ${style.optionText}`}>
                  {getOptionLabel(optionId)}
                </IonText>
              </IonItem>
            ))}
          </section>
        </IonCol>
      </IonCardContent>
			<div hidden>
			Selected option: {selectedOption ? getOptionLabel(selectedOption) : "None"}
			</div>
    </IonCard>
  );
};

export default QuestionCard;

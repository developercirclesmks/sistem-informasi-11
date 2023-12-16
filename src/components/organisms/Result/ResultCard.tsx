import {
	IonContent,
	IonHeader,
	IonPage,
	IonIcon,
	IonText,
	IonTitle,
	IonToolbar,
	IonCard,
} from "@ionic/react";
import React from "react";
import style from "./ResultCard.module.css";

interface ResultCardProps{

}

const ResultCard: React.FC<ResultCardProps> = ({}) => {

	return (
		<main>
			<IonCard className={style.result_card}>
				<section className={style.result}>
					<IonText className={style.result_title} color={"primary"}>
						<h1>Result</h1>
					</IonText>
					<div className={style.resultDetail}>
						<IonText>
							<h2 className={style.result_text}>User : </h2>
						</IonText>
						<IonText>
							<h2 className={style.result_text}>Exam Name : </h2>
						</IonText>
						<IonText>
							<h2 className={style.result_text}>Score : </h2>
						</IonText>
					</div>
				</section>
			</IonCard>
		</main>
	);
};
export default ResultCard;

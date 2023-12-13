import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonItem, IonLabel } from "@ionic/react";
import PageContainer from "../components/PageContainer";
import style from "./styles/CreateQuestionPage.module.css";
import CreateQuestionCard from "../components/molecules/AdminQuestionCard/CreateQuestionCard";
import { Link, useHistory, useParams } from "react-router-dom";
import { IExam } from "../interfaces/exam";
import { showToast } from "../components/atoms/Toasts/Toasts";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";

interface RouteParams {
	examId: string;
	index: string;
}

const CreateQuestionPage: React.FC = () => {
	const { examId } = useParams<RouteParams>();
	const history = useHistory();


	return (
		<PageContainer nopadding>
			<main className={` ${style.main}`}>
				<section className={`${style.scrollContent}`}>
					<IonCol className={`ion-padding ${style.content}`}>
						<CreateQuestionCard ExamId={examId} />
					</IonCol>
				</section>
			</main>
		</PageContainer>
	);
};

export default CreateQuestionPage;

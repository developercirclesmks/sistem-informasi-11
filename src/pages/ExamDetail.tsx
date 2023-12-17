import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import Navbar from "../components/organisms/Navbar/Navbar";
import style from "./styles/ExamDetail.module.css";
import { showToast } from "../components/atoms/Toasts/Toasts";
import { IExam } from "../interfaces/exam";
import { getOneExam } from "../services/examService";
import { timerOutline } from "ionicons/icons";
import LoadingBox from "../components/organisms/LoadingBox/LoadingBox";
import PageContainer from "../components/PageContainer";
import { Timestamp } from "firebase/firestore";

interface RouteParamsInterface {
	examId: string;
}

const ExamDetail: React.FC = () => {
	const history = useHistory();
	const { examId } = useParams<RouteParamsInterface>();
	const [exam, setExam] = useState<IExam | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const fetchedExam = await getOneExam(examId);
			if (fetchedExam) {
				setExam(fetchedExam);
				setIsLoading(false);
			} else {
				setIsLoading(false);
				showToast("error", "No such exam exists!");
				history.push("/dashboard");
			}
		} catch (error) {
			setIsLoading(false);
			console.error("Error fetching exam:", error);
			showToast("error", "Failed to fetch exam.");
			history.push("/dashboard");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleStartExam = () => {
		if (exam) {
			if (exam?.questionList.length <= 0) {
				showToast("error", "Current Exam Has No Questions In It");
			} else if (
				exam?.endedAt &&
				Timestamp.now().toMillis() > exam.endedAt.toMillis()
			) {
				showToast("error", "This exam has ended");
			} else {
				showToast("plain", `Exam: ${exam?.name}, started!`);
				history.push(`/exam/${examId}/start`);
			}
		}
	};

	if (isLoading) {
		return <LoadingBox />;
	} else {
		return (
			<PageContainer>
				<main className={style.main}>
					<IonCard color="" className={`ion-padding ${style.cardsmain}`}>
						<main>
							<IonCardTitle className="ion-padding">
								<h1 className={style.examTitle}>{exam?.name}</h1>
							</IonCardTitle>
							<IonCardSubtitle className="ion-padding">
								<div className={style.date}>
									<IonIcon src="/icon/date.svg"></IonIcon>
									<IonText>
										{exam?.startedAt
											? `${exam.startedAt
													.toDate()
													.toLocaleDateString()} at ${exam.startedAt
													.toDate()
													.toLocaleTimeString()}`
											: "Started Manually"}
									</IonText>
								</div>

								{exam?.endedAt && exam ? (
									<div className={style.date}>
										<IonIcon src="/icon/deadline.svg"></IonIcon>
										<IonText>
											{exam.endedAt.toDate().toLocaleDateString()} at{" "}
											{exam.endedAt.toDate().toLocaleTimeString()}
										</IonText>
									</div>
								) : null}
								<div className={style.date}>
									<IonIcon icon={timerOutline} />
									<IonText>{exam?.totalDuration} minute</IonText>
								</div>
							</IonCardSubtitle>
							<IonCardContent className="ion-padding ">
								<article className={style.descriptionCtn}>{exam?.desc}</article>
							</IonCardContent>
						</main>
						<aside className={` ${style.aside}`}>
							<main className={style.asidectn}>
								<div className={`ion-padding ${style.btngroup}`}>
									<IonButton
										onClick={handleStartExam}
										disabled={exam?.startedAt === null}
										className="full light"
										fill="solid"
									>
										Start Now
									</IonButton>
									<IonButton
										onClick={() => history.push(`/dashboard`)}
										className="full light"
										fill="outline"
									>
										Go Back
									</IonButton>
									<IonButton
										onClick={() => history.push(`/exam/${examId}/overview`)}
										className="full light"
										fill="outline"
									>
										Results
									</IonButton>
								</div>
								<div className="ion-padding"></div>
							</main>
						</aside>
					</IonCard>
				</main>
			</PageContainer>
		);
	}
};

export default ExamDetail;

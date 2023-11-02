import {
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Exams } from "../components/dummydata";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import Navbar from "../components/organisms/Navbar/Navbar";
import style from "./styles/ExamDetail.module.css";

interface Exam {
	id: string;
	label: string;
	schedule: Date;
	creator: string;
}

interface RouteParamsInterface {
	examId: string;
}

const ExamDetail: React.FC = () => {
	const { examId } = useParams<RouteParamsInterface>();
	const exam = Exams.find((exam: Exam) => exam.id === examId);
	const [added, setAdded] = useState(false);

	const color = added ? "danger" : "primary";
	const btnText = added ? "Remove From List" : "Add To List +";

	if (!exam) {
		return (
			<>
				<Sidebar />
				<IonPage id="main-content">
					<IonHeader>
						<Navbar />
					</IonHeader>
					<IonContent className="ion-padding">
						<main className={style.main}>
							<IonCard color="light" className={`ion-padding ${style.cantfindcard}`}>
								<section>
									<IonIcon
										className="custom"
										src="./icon/warning.svg"
										color="warning	"
									></IonIcon>
								</section>
								<IonText color={"dark"} className={style.errorMsg}>
									No Matches Found. Please Try Again
								</IonText>
								<IonButtons className={style.backButton}>
									<IonButton href="/home" color={"primary"} fill="outline">
										Back to Home
									</IonButton>
									<IonButton href="/dashboard" color={"primary"} fill="solid">
										Dashboard
									</IonButton>
								</IonButtons>
							</IonCard>
						</main>
					</IonContent>
				</IonPage>
			</>
		);
	}

	const { id, label, schedule, creator } = exam;

	const currentDate = new Date();
	const isExamPassed = currentDate > schedule ? true : false;
	const scheduleDetail = schedule;
	const day = scheduleDetail.getDate();
	const month = scheduleDetail.getMonth() + 1;
	const year = scheduleDetail.getFullYear();
	const hour = scheduleDetail.getHours();
	const minute = scheduleDetail.getMinutes();



	return (
		<>
			<Sidebar />
			<IonPage id="main-content">
				<IonHeader>
					<Navbar />
				</IonHeader>
				<IonContent className="ion-padding">
					<main className={style.main}>
						<IonCard color="" className={`ion-padding ${style.cardsmain}`}>
							<main>
								<IonCardTitle className="ion-padding">
									<h1>{label}</h1>
								</IonCardTitle>
								<IonCardSubtitle className="ion-padding">
									<div className={style.date}>
										<IonIcon color="primary" src="/icon/person.svg"></IonIcon>
										<IonText color={"primary"}>{creator}</IonText>
									</div>
									<div className={style.date}>
										<IonIcon
											color={isExamPassed ? "danger" : "primary"}
											src="/icon/date.svg"
										></IonIcon>
										<IonText color={isExamPassed ? "danger" : "primary"}>
											{day}/{month}/{year}, {hour <10 ? "0"+hour:hour}:{minute <10 ? "0"+minute:minute}
										</IonText>
									</div>
									{isExamPassed ? (
										<div className={style.date}>
											<IonIcon color="danger" src="/icon/alert.svg"></IonIcon>
											<IonText color="danger">
												This Exam Is Not Available Anymore
											</IonText>
										</div>
									) : (
										""
									)}
								</IonCardSubtitle>
								<IonCardContent className="ion-padding">
									<article>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Dolores quas ad, nulla error praesentium mollitia rem
										quidem, soluta laudantium quod libero! Unde quod sed
										nesciunt a error vel laudantium dolorem.
									</article>
								</IonCardContent>
							</main>
							<aside className={` ${style.aside}`}>
								<main className={style.asidectn}>
									<IonCardContent color="light">
										<div>
											<IonButton disabled={isExamPassed} fill="solid">
												Start Now
											</IonButton>
										</div>
										<div>
											<IonButton
												fill="outline"
												disabled={isExamPassed}
												onClick={() => setAdded(!added)}
												color={color}
												className="custom2"
											>
												{btnText}
											</IonButton>
										</div>
									</IonCardContent>
								</main>
							</aside>
						</IonCard>
					</main>
				</IonContent>
			</IonPage>
		</>
	);
};

export default ExamDetail;

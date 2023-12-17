import React, { useEffect, useState } from "react";
import {
	IonButton,
	IonCol,
	IonIcon,
	IonItem,
	IonLabel,
	IonText,
} from "@ionic/react";
import PageContainer from "../components/PageContainer";
import style from "./styles/EditQuestionPage.module.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { IExam } from "../interfaces/exam";
import { showToast } from "../components/atoms/Toasts/Toasts";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import EditQuestionCard from "../components/molecules/AdminQuestionCard/EditQuestionCard";
import { arrowBackOutline } from "ionicons/icons";
import { formatDate, formatToHour } from "../formatter/formatter";
import LoadingBox from "../components/organisms/LoadingBox/LoadingBox";
import { useMediaQuery } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { IUser } from "../interfaces/user";
import { getUserData } from "../services/userService";

interface RouteParams {
	examId: string;
	index: string;
}

const EditQuestionPage: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const { examId, index } = useParams<RouteParams>();

	const history = useHistory();

	const [exam, setExam] = useState<IExam>();

	useEffect(() => {
		setLoading(true);

		const docRef = doc(db, "exams", examId);
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const fetchedExam = doc.data() as IExam;
				setExam(fetchedExam);
				setLoading(false);
			} else {
				showToast("error", "Invalid Exam Id");
				history.goBack();
				setLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [examId, history]);

	if (exam) {
		if (parseInt(index) > exam?.questionList.length) {
			showToast("error", "Invalid Question Number");
			history.push(`/exam/${examId}/edit`);
		}
	}

	const small = useMediaQuery("(max-width:767px)");

	const [uid, setUid] = useState<string | null>(null);
	const [userDoc, setUserDoc] = useState<IUser | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
			}
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			if (uid) {
				try {
					const userData = await getUserData(uid);
					setUserDoc(userData);
				} catch (error) {}
			}
		};

		fetchUserData();
	}, [uid]);

	if (loading) {
		return <LoadingBox />;
	} 
	else {
		if(exam?.startedAt && Timestamp.now().toMillis() > exam?.startedAt.toMillis() ){
			showToast("error", "Cant Edit Exam");
			history.push(`/dashboard`);
		}
		else{

		}
		if (userDoc?.role === "user") {
			showToast("error", "You are not Authorized");
			history.push("/dashboard");
		} else {
			return (
				<PageContainer nopadding>
					<main className={` ${style.main}`}>
						<aside className={style.aside}>
							<IonItem className="">
								<IonButton
									onClick={() => history.push(`/exam/${examId}/edit`)}
									size="default"
									fill="clear"
									className=""
								>
									<IonIcon icon={arrowBackOutline}></IonIcon>
									<IonText className="">&nbsp;Back</IonText>
								</IonButton>
							</IonItem>
							<section>
								<IonItem
									title={exam?.name}
									lines="none"
									button
									className="noPadding noMargin"
								>
									<IonLabel>Name :</IonLabel>
									<p className={style.ellipsis}>{exam?.name}</p>
								</IonItem>
								<IonItem lines="none" button className="noPadding noMargin">
									<IonLabel>Started At:</IonLabel>
									{exam?.startedAt
										? exam?.startedAt &&
										  `${formatDate(
												exam.startedAt.toDate().toISOString(),
												"medium"
										  )} at ${
												exam?.startedAt &&
												formatToHour(exam.startedAt.toDate().toISOString())
										  }`
										: "Manual"}
								</IonItem>
							</section>
							<section className={`ion-padding ${style.numberGrid}`}>
								{exam?.questionList.map((question, Index) => (
									<div key={Index} className={style.numberButton}>
										<Link to={`/exam/${examId}/edit/${Index + 1}`}>
											<IonButton
												id={question.name}
												className="fixwidth"
												fill="outline"
												color={
													Index + 1 === parseInt(index) ? "primary" : "dark"
												}
											>
												{Index + 1}
											</IonButton>
										</Link>
									</div>
								))}
							</section>

							<IonButton
								size="default"
								className="full ion-padding light"
								fill="outline"
								onClick={() => history.push(`/exam/${examId}/edit/new`)}
							>
								Add Question +
							</IonButton>
						</aside>
						<section className={`${style.scrollContent}`}>
							<IonCol className={`ion-padding ${style.content}`}>
								<EditQuestionCard examId={examId} />
							</IonCol>
						</section>
					</main>
				</PageContainer>
			);
		}
	}
};

export default EditQuestionPage;

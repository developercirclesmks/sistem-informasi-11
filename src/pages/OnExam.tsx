import {
	IonAlert,
	IonButton,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import style from "./styles/OnExam.module.css";
import { Timestamp, collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { showToast } from "../components/atoms/Toasts/Toasts";
import LoadingBox from "../components/organisms/LoadingBox/LoadingBox";
import { IExam } from "../interfaces/exam";
import { arrowBackOutline } from "ionicons/icons";
import { formatToHour } from "../formatter/formatter";
import QuestionCard from "../components/molecules/QuestionCard/QuestionCard";
import { IUser } from "../interfaces/user";
import { getUserData } from "../services/userService";
import { onAuthStateChanged } from "firebase/auth";
import { IExamResult } from "../interfaces/result";
import { setResult } from "../services/resultService";

interface RouteParams {
	examId: string;
}

const OnExam: React.FC = () => {
	const { examId } = useParams<RouteParams>();
	const history = useHistory();
	const [uid, setUid] = useState<string | null>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [exam, setExam] = useState<IExam>();
	const [num, setNum] = useState<number>(0);
	const [showSubmitAlert, setShowSubmitAlert] = useState(false);

	const [initialOptions, setInitialOptions] = useState<(number | null)[]>([]); // Initialize as an empty array

	useEffect(() => {
		setLoading(true);

		const docRef = doc(db, "exams", examId);
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const fetchedExam = doc.data() as IExam;
				setExam(fetchedExam);
				setInitialOptions(Array(exam?.questionList.length).fill(null));
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

	const [selectedOptions, setSelectedOptions] =
		useState<(number | null)[]>(initialOptions);

	const handleSelectedOptionsChange = (QIndex: number, optionIndex: number) => {
		const updatedOptions = [...selectedOptions];
		updatedOptions[QIndex] =
			optionIndex === updatedOptions[QIndex] ? null : optionIndex;
		setSelectedOptions(updatedOptions);
	};

	const handleSubmitExam = async () => {
		try {
			if (exam && exam.questionList && selectedOptions) {
				let totalCorrect = 0;

				for (let i = 0; i < exam.questionList.length; i++) {
					const correctAnswer = exam.questionList[i].correctAnswer;
					const selectedAnswer = selectedOptions[i];

					if (correctAnswer === selectedAnswer) {
						totalCorrect++;
					}
				}

				const score = (totalCorrect / exam.questionList.length) * 100;

				if (uid && examId && userDoc) {
					const resultId = `${examId}_${uid}`; // Generating a unique ID for the result
					const examResultData: IExamResult = {
						id: resultId,
						exam: exam,
						user: userDoc,
						score: score,
						createdAt: Timestamp.now(),
					};

					// Instead of setResult, use addDoc to add the document to the collection
					const resultRef = doc(collection(db, "results"), resultId);
					await setDoc(resultRef, examResultData);

					showToast("success", `Exam Submitted`);
					history.push("/dashboard")
				}
			}
		} catch (error) {
			showToast("error", "Failed to submit exam");
			console.error("Failed to submit exam:", error);
		}
	};

	if (loading) {
		return <LoadingBox />;
	} else {
		return (
			<>
				<PageContainer nopadding>
					<main className={` ${style.main}`}>
						<aside className={style.aside}>
							<IonItem className="">
								<IonButton
									onClick={() => history.push(`/exam/${examId}`)}
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
									<IonLabel>Ended At:</IonLabel>
									{exam?.endedAt
										? exam?.endedAt &&
										  `${
												exam?.endedAt &&
												formatToHour(exam.endedAt.toDate().toISOString())
										  }`
										: "Manual"}
								</IonItem>
							</section>
							<section className={`ion-padding ${style.numberGrid}`}>
								{exam?.questionList.map((question, Index) => (
									<div key={Index} className={style.numberButton}>
										<IonButton
											id={question.name}
											className="fixwidth"
											fill="outline"
											onClick={() => setNum(Index)}
											color={Index === num ? "primary" : "dark"}
										>
											{Index + 1}
										</IonButton>
									</div>
								))}
							</section>
							<IonButton
								onClick={() => setShowSubmitAlert(true)}
								size="small"
								fill="clear"
								className="full ion-padding"
							>
								Submit
							</IonButton>
							<IonAlert
								isOpen={showSubmitAlert}
								header="Submit Your Exam ?"
								message={"Are you sure you want to submit your exam?"}
								trigger="submit"
								onDidDismiss={() => setShowSubmitAlert(false)}
								buttons={[
									{
										text: "Cancel",
										role: "cancel",
										handler: () => {
											console.log("Alert canceled");
										},
									},
									{
										text: "OK",
										role: "Ok",
										handler: () => {
											handleSubmitExam();
										},
									},
								]}
							></IonAlert>
							{/* null alert */}
							<div>
								{/* Selected option array data type:{" "}
								{selectedOptions.map((element) => typeof element).join(", ")} */}
								{/* {selectedOptions.join(", ")} */}
							</div>
						</aside>
						<section className={`ion-padding ${style.scrollContent}`}>
							<main className={style.content}>
								<IonCol>
									{exam && (
										<QuestionCard
											exam={exam}
											QIndex={num}
											onSelectedOptionsChange={handleSelectedOptionsChange}
											selectedIndex={selectedOptions[num]}
										/>
									)}
								</IonCol>
							</main>
						</section>
					</main>
				</PageContainer>
			</>
		);
	}
};
export default OnExam;

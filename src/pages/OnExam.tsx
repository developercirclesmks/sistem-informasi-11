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
import {
	Timestamp,
	collection,
	doc,
	onSnapshot,
	setDoc,
} from "firebase/firestore";
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
	const [showForceSubmit, setShowForceSubmit] = useState(false);
	const [showSubmitAlert, setShowSubmitAlert] = useState(false);

	const storedOptions = JSON.parse(
		localStorage.getItem("selectedOptions") || "null"
	);
	const [initialOptions, setInitialOptions] = useState(
		storedOptions || Array(exam?.questionList.length || 0).fill(null)
	);
	const [selectedOptions, setSelectedOptions] =
		useState<(number | null)[]>(initialOptions);

	const now = Timestamp.now();

	useEffect(() => {
		setLoading(true);
		const docRef = doc(db, "exams", examId);
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const fetchedExam = doc.data() as IExam;
				setExam(fetchedExam);
				setInitialOptions(Array(exam?.questionList.length || 0).fill(null));
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

	const [snapshotNow] = useState<number>(Timestamp.now().toMillis());

	const ExamNotValid = exam?.endedAt && snapshotNow > exam?.endedAt?.toMillis();
	if (ExamNotValid) {
		showToast("error", "Exam Invalid");
		history.push(`/exam/${examId}`);
	}

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

	useEffect(() => {
		const storedOptions = JSON.parse(
			localStorage.getItem(`selectedOptions_${examId}`) || "null"
		);

		if (!storedOptions) {
			localStorage.setItem(
				`selectedOptions_${examId}`,
				JSON.stringify(initialOptions)
			);
		} else {
			setSelectedOptions(storedOptions);
		}
	}, [initialOptions]);

	const [timeRemaining, setTimeRemaining] = useState<number>(0)
	useEffect(() => {
		if (!exam) return;

		const nowMillis = Timestamp.now().toMillis();

		if (
			exam.startedAt &&
			exam.endedAt &&
			nowMillis > exam.startedAt.toMillis() &&
			nowMillis < exam.endedAt.toMillis()
		) {
			const remaining = exam.endedAt.toMillis() - nowMillis;
			setTimeRemaining(remaining);

			const timer = setInterval(() => {
				setTimeRemaining((prevTime) => {
					if (prevTime && prevTime >= 1000) {
						return prevTime - 1000;
					} else if (!showForceSubmit) {
						setShowForceSubmit(true);
					}
					return 0;
				});
			}, 1000);

			return () => clearInterval(timer);
		} else if (exam?.endedAt && nowMillis > exam.endedAt.toMillis()) {
			setShowForceSubmit(true);
		}
	}, [exam]);

	const [formattedTime, setFormattedTime] = useState<string>("");

	useEffect(() => {
		if (timeRemaining !== null) {
			const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
			const minutes = Math.floor(
				(timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

			const formattedHours = hours.toString().padStart(2, "0");
			const formattedMinutes = minutes.toString().padStart(2, "0");
			const formattedSeconds = seconds.toString().padStart(2, "0");

			setFormattedTime(
				`${formattedHours}:${formattedMinutes}:${formattedSeconds}`
			);
		}
	}, [timeRemaining]);

	const handleSelectedOptionsChange = (QIndex: number, optionIndex: number) => {
		const updatedOptions = [...selectedOptions];
		updatedOptions[QIndex] =
			optionIndex === updatedOptions[QIndex] ? null : optionIndex;
		setSelectedOptions(updatedOptions);
		localStorage.setItem(
			`selectedOptions_${examId}`,
			JSON.stringify(updatedOptions)
		);
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
					const resultId = `${examId}_${uid}`;
					const examResultData: IExamResult = {
						id: resultId,
						examid: examId,
						exam: exam,
						user: userDoc,
						score: score,
						createdAt: Timestamp.now(),
						selectedOptions: initialOptions,
					};

					const resultRef = doc(collection(db, "results"), resultId);
					await setDoc(resultRef, examResultData);

					showToast("success", `Exam Submitted`);
					localStorage.removeItem(`selectedOptions_${examId}`);
					history.push("/dashboard");
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
		if (
			exam?.startedAt === null ||
			(exam?.startedAt && now.toMillis() < exam?.startedAt.toMillis())
		) {
			history.replace(`/exam/${examId}`);
			showToast("error", "Exam has not started yet");
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
										<p className={style.ellipsis}>{exam?.name} </p>
									</IonItem>
									<IonItem lines="none" button className="noPadding noMargin">
										<IonLabel>Ended In:</IonLabel>
										{<p>{formattedTime !== "" ? formattedTime : "00:00:00"}</p>}
									</IonItem>
								</section>
								<section className={`ion-padding ${style.numberGrid}`}>
									{exam?.questionList.map((question, Index) => (
										<div key={Index} className={style.numberButton}>
											<IonButton
												id={question.name}
												className="fixwidth"
												fill={
													selectedOptions[Index] !== null &&
													selectedOptions[Index] !== undefined
														? "solid"
														: "outline"
												}
												onClick={() => setNum(Index)}
												color={
													Index === num ||
													(selectedOptions[Index] !== null &&
														selectedOptions[Index] !== undefined)
														? "primary"
														: "dark"
												}
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
									disabled={
										selectedOptions.some(
											(option) => option === null || option === undefined
										) ||
										selectedOptions.filter(
											(option) => option !== null && option !== undefined
										).length !== (exam?.questionList?.length || 0)
									}
								>
									Submit
								</IonButton>
								{/* {snapshotNow} */}

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

								<IonAlert
									isOpen={showForceSubmit}
									header="Time Out"
									message={"Submit Your Exam Now!!!"}
									buttons={[
										{
											text: "OK",
											role: "Ok",
											handler: () => {
												handleSubmitExam();
											},
										},
									]}
									onDidDismiss={() => handleSubmitExam()}
								></IonAlert>
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
	}
};

export default OnExam;

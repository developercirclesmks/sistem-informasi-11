import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCol,
	IonItem,
	IonRow,
	IonText,
} from "@ionic/react";
import PageContainer from "../components/PageContainer";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { ResultTable } from "../components/tables/resultTable";
import { getAllResults } from "../services/resultService";
import { IExamResult } from "../interfaces/result";
import { useAutocomplete } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import { getOneExam } from "../services/examService";
import { IExam } from "../interfaces/exam";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { IUser } from "../interfaces/user";
import { getUserData } from "../services/userService";
import { showToast } from "../components/atoms/Toasts/Toasts";
import LoadingBox from "../components/organisms/LoadingBox/LoadingBox";
import { formatDate, formatToHour } from "../formatter/formatter";
import QuestionCard from "../components/molecules/QuestionCard/QuestionCard";
import style from "./styles/ExamOverview.module.css";

interface RouteParams {
	examId: string;
}

const ExamOverview: React.FC = () => {
	const history = useHistory();
	const { examId } = useParams<RouteParams>();
	const [isLoading, setIsLoading] = useState<boolean>();

	const [results, setResults] = useState<IExamResult[]>([]);
	const [exam, setExam] = useState<IExam | undefined>(undefined);

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

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const [fetchedResults, fetchedExam] = await Promise.all([
					getAllResults(),
					getOneExam(examId),
				]);

				const filteredResults = fetchedResults.filter((result) =>
					result.id.startsWith(examId)
				);

				setResults(filteredResults);
				setExam(fetchedExam);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [examId]);

	if (isLoading) {
		return <LoadingBox />;
	} else {
		return (
			<PageContainer>
				<IonRow>
					<IonCardContent>
						<IonRow>
							<IonText>Exam Name: {exam?.name}</IonText>
						</IonRow>
						<IonRow></IonRow>
						<IonRow>
							<IonText>Duration: {exam?.totalDuration} minute</IonText>
						</IonRow>{" "}
						<IonRow>
							<IonText>Description: {exam?.desc}</IonText>
						</IonRow>
						<IonRow></IonRow>
						<IonRow>
							<IonText>
								Started At
								<IonRow>
									<IonText>
										Started At:{" "}
										{exam?.startedAt
											? `${exam?.startedAt
													.toDate()
													.toLocaleDateString()} at ${exam?.startedAt
													.toDate()
													.toLocaleTimeString()}`
											: "Started Manually"}
									</IonText>
								</IonRow>
							</IonText>
						</IonRow>
					</IonCardContent>
				</IonRow>
				<IonRow className="ion-padding">
					<div>EXAM RESULTS:</div>
					<TableContainer color="" component={Paper}>
						<ResultTable data={results} />
					</TableContainer>
				</IonRow>
				{userDoc?.role === "admin" ? (
					<IonRow>
						<IonCol>
							{exam?.questionList.map((questions, index) => (
								<IonCard className={`${style.cardmain}`}>
									<IonCardContent className="">
										<IonText>No.{index + 1}</IonText>
										<IonCol>
											<IonRow>
												<IonText>Question :</IonText>
											</IonRow>
											<IonRow className="ion-padding">
												<IonText color={"dark"}>{questions.name}</IonText>
											</IonRow>
											<section className="ion-padding">
												{exam.questionList[index].optionList.map(
													(options, optindex) => (
														<IonItem
															lines="none"
															button
															className={style.option}
															key={optindex}
														>
															<IonButton
																color={"primary"}
																className={style.optionlabel}
																fill="outline"
																disabled
															>
																{options.optionLabel}
															</IonButton>
															<IonText
																className={`ion-padding ${style.optionText}`}
															>
																{options.name}
															</IonText>
														</IonItem>
													)
												)}
											</section>
											<p>
												Correct Answer :{" "}
												{
													questions.optionList[questions.correctAnswer]
														.optionLabel
												}
												. {questions.optionList[questions.correctAnswer].name}{" "}
											</p>
										</IonCol>
									</IonCardContent>
								</IonCard>
							))}
						</IonCol>
					</IonRow>
				) : null}
			</PageContainer>
		);
	}
};

export default ExamOverview;

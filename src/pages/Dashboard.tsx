import React, { useEffect, useState } from "react";
import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonText,
	IonRow,
	IonCol,
	IonSearchbar,
	SearchbarChangeEventDetail,
} from "@ionic/react";
import style from "./styles/Dashboard.module.css";
import PageContainer from "../components/PageContainer";
import { getAllExam, startExam } from "../services/examService";
import { showToast } from "../components/atoms/Toasts/Toasts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { getUserData } from "../services/userService";
import { ExamCard } from "../components/molecules/examCard/ExamCard";
import { IUser } from "../interfaces/user";
import { IExam } from "../interfaces/exam";
import { ExamTable } from "../components/tables/examTable";
import DashboardHero from "../components/organisms/Dashboard/DashboardHero/DashboardHero";
import LoadingBox from "../components/organisms/LoadingBox/LoadingBox";

const Dashboard: React.FC = () => {
	const [examData, setExamData] = useState<IExam[]>([]);
	const [uid, setUid] = useState<string | null>(null);
	const [userDoc, setUserDoc] = useState<IUser | null>(null);
	const [query, setQuery] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchExams = async () => {
			setIsLoading(true);
			try {
				const exams = await getAllExam();
				setExamData(exams);
			} catch (error) {
				showToast("error", "Error fetching exams");
				setIsLoading(false);
			}
		};

		fetchExams();
		setIsLoading(false);
	}, []);

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

	const [filteredExams, setFilteredExams] = useState<IExam[]>([]);

	const handleInput = (e: CustomEvent<SearchbarChangeEventDetail>) => {
		const inputValue = e.detail.value?.toLowerCase() || "";
		setQuery(inputValue);

		if (inputValue === "") {
			setFilteredExams(examData);
		} else {
			const filtered = examData.filter((exam) =>
				exam.name.toLowerCase().includes(inputValue)
			);
			setFilteredExams(filtered);
		}
	};

	const handleStartExam = async (id: string) => {
		try {
			const selectedExam = examData.find((exam) => exam.id === id);

			if (selectedExam) {
				await startExam(id, selectedExam.totalDuration);
				showToast("success", "Exam Started");

				const updatedExams = await getAllExam();
				setExamData(updatedExams);
			} else {
				showToast("error", "Exam not found");
			}
		} catch (error) {
			showToast("error", "Failed to start exam");
		}
	};

	if (isLoading) {
		return <LoadingBox />;
	} else {
		return (
			<PageContainer>
				<IonCol>
					<main className={style.col}>
						{userDoc?.role === "admin" && (
							<>
								<DashboardHero />

								<div>
									<IonCard className="" color={"light"}>
										<IonCardHeader>
											<IonText color={"primary"}>
												<h4>Exam List:</h4>
											</IonText>
										</IonCardHeader>
										<IonCardContent className="">
											<ExamTable
												data={examData}
												handleStartExam={handleStartExam}
											/>
										</IonCardContent>
									</IonCard>
								</div>
								<div></div>
							</>
						)}
					</main>
				</IonCol>
				{userDoc?.role === "user" && (
					<>
						<IonRow>
							<IonCol>
								<IonCol className={`grow ${style.primCard}`}>
									<IonCardContent className={`full ${style.ExamList}`}>
										<div className={`full ${style.examListHead}`}>
											<h2>Discover Our Exam:</h2>
											<div className={style.search}>
												<IonSearchbar
													showCancelButton="focus"
													onIonInput={handleInput}
													debounce={200}
												></IonSearchbar>
											</div>
										</div>
										<main className={style.examListGrid}>
											{query === "" ? ( // Check if the search query is empty
												examData.map((exam) => (
													<ExamCard
														key={exam.id}
														examName={exam.name}
														examDescription={exam.desc}
														examDuration={exam.totalDuration}
														examDate={
															exam.startedAt
																? `${exam.startedAt
																		.toDate()
																		.toLocaleDateString()} at ${exam.startedAt
																		.toDate()
																		.toLocaleTimeString()}`
																: "Started Manually"
														}
														examDeadline={exam.endedAt? exam?.endedAt:null}
														examId={exam?.id}
													/>
												))
											) : // Display this when the search bar has a value
											filteredExams.length > 0 ? (
												filteredExams.map((exam) => (
													<ExamCard
														key={exam.id}
														examName={exam.name}
														examDescription={exam.desc}
														examDuration={exam.totalDuration}
														examDate={
															exam.startedAt
																? `${exam.startedAt
																		.toDate()
																		.toLocaleDateString()} at ${exam.startedAt
																		.toDate()
																		.toLocaleTimeString()}`
																: "Started Manually"
														}
														examDeadline={exam.endedAt? exam?.endedAt:null}
														examId={exam.id}
													/>
												))
											) : (
												<IonText>No matching exams found.</IonText>
											)}
										</main>
									</IonCardContent>
								</IonCol>
							</IonCol>
						</IonRow>
					</>
				)}
			</PageContainer>
		);
	}
};

export default Dashboard;

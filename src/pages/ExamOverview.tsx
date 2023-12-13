import { IonCard, IonCardContent, IonRow, IonText } from "@ionic/react";
import PageContainer from "../components/PageContainer";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { ResultTable } from "../components/tables/resultTable";
import { getAllResults } from "../services/resultService";
import { IExamResult } from "../interfaces/result";
import { useAutocomplete } from "@mui/material";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getOneExam } from "../services/examService";
import { IExam } from "../interfaces/exam";
import { useState } from "react";

interface RouteParams {
	examId: string;
}

const ExamOverview: React.FC = () => {
	const { examId } = useParams<RouteParams>();

	const [results, setResults] = useState<IExamResult[]>([]);
	const [exam, setExam] = useState<IExam | undefined>(undefined); // State for the selected exam

	useEffect(() => {
		const fetchData = async () => {
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
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [examId]);

	return (
		<PageContainer>
			{results.length > 0 && (
				<IonCard>
					<IonCardContent>
						<IonRow>
							<IonText>Exam Name: {exam?.name}</IonText>
						</IonRow>
						<IonRow></IonRow>
						<IonRow>
							<IonText>Duration: {exam?.totalDuration}</IonText>
						</IonRow>
					</IonCardContent>
				</IonCard>
			)}

			<IonCard>
				<div>EXAM RESULTS:</div>
				<TableContainer color="" component={Paper}>
					<ResultTable data={results} />
				</TableContainer>
			</IonCard>
		</PageContainer>
	);
};

export default ExamOverview;

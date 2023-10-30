import {
	IonMenu,
	IonContent,
	IonHeader,
	IonPage,
	ItemReorderEventDetail,
} from "@ionic/react";
import React from "react";
import style from "./Dashboard.module.css";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import Navbar from "../components/organisms/Navbar/Navbar";
import ProfileCard from "../components/organisms/Dashboard/ProfileCard/ProfileCard";
import StatsCard from "../components/organisms/Dashboard/StatsCard/StatsCard";
import { Link } from "react-router-dom";
import AboutUsCard from "../components/molecules/aboutuscard/AboutUsCard";
import ExamListCard from "../components/organisms/Dashboard/ExamList/ExamListsCard";
import { passedLength, upcomingLength} from "../components/dummydata";

const Dashboard: React.FC = () => {
	return (
		<>
			<Sidebar />
			<IonPage id="main-content">
				<Navbar />
				<IonContent color="primary">
					<div>
						{/* something cool here */}
					</div>
					<div className={style.cardsRow3}>
						{statlist.map((maps, index) => (
							<StatsCard key={index} label={maps.label} value={maps.value} />
						))}
					</div>
					<div className={style.cardsRow2}>
						<ExamListCard passed/>
						<ExamListCard />
					</div>
				</IonContent>
			</IonPage>
		</>
	);
};

export default Dashboard;

const statlist = [
	{
		label: "Exams Done",
		value: passedLength,
	},
	{
		label: "Time Spent Today",
		value: "3hr",
	},
	{
		label: "Upcoming Exams",
		value: upcomingLength,
	},
];

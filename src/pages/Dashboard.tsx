import {
	IonMenu,
	IonContent,
	IonHeader,
	IonPage,
	ItemReorderEventDetail,
	IonCard,
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
import { passedLength, upcomingLength } from "../components/_dummydata";
import DashboardHero from "../components/organisms/Dashboard/DashboardHero/DashboardHero";

const Dashboard: React.FC = () => {
	return (
		<>
			<Sidebar />
			<IonPage id="main-content">
				<Navbar />
				<IonContent className="ion-padding" >
					<main className={style.col}>
						<div>
							<IonCard className="ion-padding" color={"light"}>
								<main className={style.MainCard}>
									<img alt="IMAGES" className="" src="/icon/OnEx Hi.svg" />
								</main>
							</IonCard>
						</div>
						<div>
							<DashboardHero />
						</div>

						<div className={style.cardsRow3}>
							{statlist.map((maps, index) => (
								<StatsCard key={index} label={maps.label} value={maps.value} />
							))}
						</div>
						<div className={style.cardsRow2}>
							<ExamListCard passed />
							<ExamListCard />
						</div>
					</main>
					<div id="contactBox">
						contactbox																																			
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
		label: "Class Attended",
		value: "1",
	},
	{
		label: "Upcoming Exams",
		value: upcomingLength,
	},
];

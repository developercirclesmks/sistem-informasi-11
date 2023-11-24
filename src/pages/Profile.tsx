import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonText,
	IonItem,
} from "@ionic/react";
import React from "react";
import Navbar from "../components/organisms/Navbar/Navbar";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import style from "./styles/Profile.module.css";
import ProfileCard from "../components/organisms/Dashboard/ProfileCard/ProfileCard";
import PageContainer from "../components/PageContainer";
const Profile: React.FC = () => {
	return (
		<PageContainer>
			<ProfileCard />
		</PageContainer>
	);
};

export default Profile;

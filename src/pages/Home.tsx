import {
	IonContent,
	IonHeader,
	IonMenu,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import Navbar from "../components/organisms/Navbar/Navbar";
import Hero from "../components/organisms/Hero/Hero";
import Sidebar from "../components/organisms/Sidebar/Sidebar";

const Home: React.FC = () => {
	return (
		<>
			<Sidebar />
			<IonPage id="main-content">
				<IonHeader>
					<Navbar />
				</IonHeader>
				<IonContent fullscreen>
					<Hero />
				</IonContent>
			</IonPage>
		</>
	);
};

export default Home;

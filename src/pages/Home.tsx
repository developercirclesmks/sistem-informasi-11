import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonMenu,
	IonPage,
	IonRow,
	IonSearchbar,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import Navbar from "../components/organisms/Navbar/Navbar";
import Hero from "../components/organisms/Hero/Hero";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import { useState } from "react";
import style from "./styles/Home.module.css";
import LinkCard from "../components/molecules/LinkCard/LinkCard";
import { useHistory } from "react-router";

const Home: React.FC = () => {
	const history = useHistory();
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (inputValue) {
			history.push(`/join/${inputValue}`);
		}
	};
	const handleInputChange = (event: any) => {
		setInputValue(event.target.value);
	};

	return (
		<>
			<Sidebar />
			<IonPage id="main-content">
				<IonHeader>
					<Navbar />
				</IonHeader>
				<IonContent fullscreen className="ion-padding">
					<Hero />
					{/* <main className={style.mainExam}>
						<IonCard className={`ion-padding ${style.codeCard}`}>
							<IonText color="dark">Join An Exams</IonText>
							<IonCardContent>
								<form onSubmit={handleSubmit}>
									<IonItem color={"default"}>
										<IonInput
											class="custom"
											id="custom-input"
											type="search"
											debounce={0}
											placeholder="Enter Exams ID"
											clearInput={true}
											color={"primary"}
											maxlength={12}
											value={inputValue}
											onIonInput={handleInputChange}
										></IonInput>
										<IonButton
											className="custom"
											size="default"
											color="primary"
											onClick={handleSubmit}
											disabled={setDisable}
										>
											Submit
										</IonButton>
									</IonItem>
								</form>
							</IonCardContent>
						</IonCard>
						<IonCard color={""} className={`ion-padding ${style.newCards}`}>
							<IonText color="dark">Or Create A New One</IonText>
							<IonCardContent>
								<section className={style.newCardsContent}>
									<LinkCard icon="exams.svg" link="/dashboard">
										New Exams
									</LinkCard>
									<LinkCard icon="/class.svg">New Class</LinkCard>
								</section>
							</IonCardContent>
						</IonCard>
					</main> */}
					<article></article>
				</IonContent>
			</IonPage>
		</>
	);
};

export default Home;

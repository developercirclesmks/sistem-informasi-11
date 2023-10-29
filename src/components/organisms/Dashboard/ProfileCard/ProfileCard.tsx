import {
	IonButton,
	IonCard,
	IonCardContent,
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,

} from "@ionic/react";
import React from "react";
import style from "./ProfileCard.module.css";

const ProfileCard: React.FC = () => {
	return (
		<>
			<IonCard color="light" className="ion-padding">
				<div className={style.heads}>
					<IonItem color='light' lines="none">Profile :</IonItem>
					<IonButton
						className={`${style.button}`}
						href="/profile"
						color="primary"
						shape="round"
						fill="outline"
					>
						<p>Go To Profile </p>
						<IonIcon slot="end" src="/icon/redirect.svg"></IonIcon>
					</IonButton>
					<IonButton
						href="/profile"
						shape="round"
						fill="outline"
						className={style.smButton}
					>
						<IonIcon src="/icon/redirect.svg"></IonIcon>
					</IonButton>
				</div>
				<IonCardContent className={`${style.cardContent}`}>
					<main className={style.LeftSide}>
						<section className={style.handleGridDown}>
							<div className={style.avatar}>
								<IonImg src="/images/Test.jpeg" alt="asdas" />
							</div>
						</section>
						<article>
							<IonItem color="light">
								<IonLabel>
									<h2>Name</h2>
									<p>Andi M. Fadhilul</p>
								</IonLabel>
							</IonItem>
							<IonItem color="light">
								<IonLabel>
									<h2>Username</h2>
									<p>@Andiilul</p>
								</IonLabel>
							</IonItem>
						</article>
					</main>
					<aside className={style.aside}>
						<section>
							<IonItem color="light">
								<IonLabel>
									<h2>Sex</h2>
									<p>Male</p>
								</IonLabel>
							</IonItem>
							<IonItem color="light">
								<IonLabel>
									<h2>Date Of Birth</h2>
									<p>03/11/2003</p>
								</IonLabel>
							</IonItem>
						</section>
						<section>
							<IonItem color="light">
								<IonLabel>
									<h2>Occupation</h2>
									<p>Undergraduate Student</p>
								</IonLabel>
							</IonItem>
							<IonItem color="light">
								<IonLabel>
									<h2>Institution</h2>
									<p>Hasanuddin University</p>
								</IonLabel>
							</IonItem>
						</section>
					</aside>
				</IonCardContent>
			</IonCard>
		</>
	);
};

export default ProfileCard;

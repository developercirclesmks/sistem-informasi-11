"use client";

import {
	IonButton,
	IonCard,
	IonCardContent,
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import style from "./ProfileCard.module.css";
import { auth, db } from "../../../../config/firebase-config"; // Check this import path
import { collection, getDocs } from "firebase/firestore";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProfileCard: React.FC = () => {
	const [uid, setUid] = useState<string | null>(null);
	const [userDoc, setUserDoc] = useState<any | null>(null);

	const getUserData = async (userId: string) => {
		const colref = collection(db, "users");
		const snapshot = await getDocs(colref);

		const docs = snapshot.docs.map((doc) => {
			const data = doc.data();
			data.id = doc.id;
			return data;
		});

		const foundUserDoc = docs.find((doc) => doc.id === userId);
		setUserDoc(foundUserDoc);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
			}
		});

		return () => unsubscribe(); // Cleanup the subscription when the component unmounts
	}, []);

	useEffect(() => {
		if (uid) {
			getUserData(uid);
		}
	}, [uid]);

	return (
		<>
			<IonCard color="light" className="ion-padding">
				<div className={style.heads}>
					<IonButton
						href="/profile"
						shape="round"
						fill="outline"
						className={style.smButton}
					>
						<IonIcon src="/icon/redirect.svg"></IonIcon>
					</IonButton>
				</div>
				<IonCardContent className={`${style.cardContent} `}>
					<main className={style.LeftSide}>
						<section className={style.handleGridDown}>
							<div className={style.avatar}>
								<IonImg src="/images/Test.jpeg" alt="asdas" />
							</div>
						</section>
						<article>
							<IonItem lines="full" color="light">
								<IonLabel>
									<h2>Name</h2>
									<p>
										{userDoc ? userDoc.firstName + " " + userDoc.lastName : ""}
									</p>
								</IonLabel>
							</IonItem>{" "}
							<IonItem lines="full" color="light">
								<IonLabel>
									<h2>Email</h2>
									<p>{userDoc ? userDoc.email : ""}</p>
								</IonLabel>
							</IonItem>
							<IonItem lines="full" color="light">
								<IonLabel>
									<h2>Username</h2>
									<p>@{userDoc ? userDoc.username : ""}</p>
								</IonLabel>
							</IonItem>
						</article>
					</main>
					<aside className={style.aside}>
						<section>
							<IonItem lines="full" color="light">
								<IonLabel>
									<h2>Sex</h2>
									<p>{userDoc ? (userDoc.Gender || "not Set Yet") : ""}</p>
								</IonLabel>
							</IonItem>
							<IonItem lines="full" color="light">
								<IonLabel>
									<h2>Date Of Birth</h2>
									<p>{userDoc ? (userDoc.dateOfBirth || "undefined") : ""}</p>
								</IonLabel>
							</IonItem>
							<IonItem lines="full" color="light">
								<IonLabel>
									<h2>Phone Number</h2>
									<p>{userDoc ? (userDoc.phoneNumber || "undefined") : ""}</p>
								</IonLabel>
							</IonItem>
						</section>
						<section>
							<IonItem lines="full" color="light">
								<IonLabel>
									<h2>Occupation</h2>
									<p>{userDoc ? (userDoc.Occupation || "no gender") : ""}</p>
								</IonLabel>
							</IonItem>
							<IonItem lines="full" color="light">
								<IonLabel>
									<h2>Institution</h2>
									<p>{userDoc ? (userDoc.Institution || "no gender") : ""}</p>
								</IonLabel>
							</IonItem>
						</section>
					</aside>
				</IonCardContent>
				<IonItem color={"light"}>
					<IonButton
						size="small"
						className={`${style.button} full`}
						href="/setting"
					>
						<p>Edit Profile</p>
					</IonButton>
				</IonItem>
			</IonCard>
		</>
	);
};

export default ProfileCard;

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
import { auth } from "../../../../../config/firebase-config"; // Check this import path
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../../../../services/userService";
import { IUser } from "../../../../interfaces/user";
import { showToast } from "../../../atoms/Toasts/Toasts";
import { formatDate } from "../../../../formatter/formatter";

const ProfileCard: React.FC = () => {
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

	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				showToast("plain", "Text copied to clipboard");
			})
			.catch((error) => {
				showToast("error", "Some Error Occured");
			});
	};

	return (
		<>
			<IonCard color="light" className="ion-padding">
				<IonCardContent className={`${style.cardContent} `}>
					<main className={style.LeftSide}>
						<section className={style.handleGridDown}>
							<div className={style.avatar}>
								<IonImg src="/images/Test.jpeg" alt="no picture" />
							</div>
							<IonButton
								size="small"
								className={`${style.button}`}
								href="/profile/edit"
								expand="full"
								fill="clear"
							>
								<p>Edit</p>
							</IonButton>
						</section>
						<article>
							<IonItem
								button
								lines="full"
								color="light"
								onClick={() =>
									copyToClipboard(
										userDoc ? userDoc.firstName + " " + userDoc.lastName : ""
									)
								}
							>
								<IonLabel>
									<h2>Name</h2>
									<p>
										{userDoc ? userDoc.firstName + " " + userDoc.lastName : ""}
									</p>
								</IonLabel>
							</IonItem>{" "}
							<IonItem
								button
								lines="full"
								color="light"
								onClick={() =>
									copyToClipboard(userDoc?.email ? userDoc.email : "")
								}
							>
								<IonLabel>
									<h2>Email</h2>
									<p>{userDoc ? userDoc.email : ""}</p>
								</IonLabel>
							</IonItem>
							<IonItem
								button
								lines="full"
								color="light"
								onClick={() =>
									copyToClipboard(userDoc?.gender ? userDoc.gender : "")
								}
							>
								<IonLabel>
									<h2>Sex</h2>
									<p>{userDoc ? userDoc.gender || "not Set Yet" : ""}</p>
								</IonLabel>
							</IonItem>
						</article>
					</main>
					<aside className={style.aside}>
						<section>
							<IonItem
								onClick={() =>
									copyToClipboard(
										userDoc && userDoc.dateOfBirth
											? formatDate(
													userDoc.dateOfBirth.toDate().toString(),
													"full"
											  )
											: "-"
									)
								}
								button
								lines="full"
								color="light"
							>
								<IonLabel>
									<h2>Date Of Birth</h2>
									<p>
										{userDoc && userDoc.dateOfBirth
											? formatDate(
													userDoc.dateOfBirth.toDate().toString(),
													"full"
											  )
											: "-"}
									</p>
								</IonLabel>
							</IonItem>
							<IonItem
								button
								lines="full"
								color="light"
								onClick={() =>
									copyToClipboard(
										userDoc?.phoneNumber ? userDoc.phoneNumber : ""
									)
								}
							>
								<IonLabel>
									<h2>Phone Number</h2>
									<p>{userDoc ? userDoc.phoneNumber || "-" : ""}</p>
								</IonLabel>
							</IonItem>
						</section>
						<section>
							<IonItem
								button
								lines="full"
								color="light"
								onClick={() =>
									copyToClipboard(userDoc?.occupation ? userDoc.occupation : "")
								}
							>
								<IonLabel>
									<h2>Occupation</h2>
									<p>{userDoc ? userDoc.occupation || "-" : ""}</p>
								</IonLabel>
							</IonItem>
							<IonItem
								button
								lines="full"
								color="light"
								onClick={() =>
									copyToClipboard(
										userDoc?.institution ? userDoc.institution : ""
									)
								}
							>
								<IonLabel>
									<h2>Institution</h2>
									<p>{userDoc ? userDoc.institution || "-" : ""}</p>
								</IonLabel>
							</IonItem>
						</section>
					</aside>
				</IonCardContent>
				<IonItem color={"light"}>
					<IonButton
						size="small"
						className={`full ${style.smButton}`}
						href="/profile/edit"
						fill="clear"
					>
						<p>Edit Profile</p>
					</IonButton>
				</IonItem>
			</IonCard>
		</>
	);
};

export default ProfileCard;

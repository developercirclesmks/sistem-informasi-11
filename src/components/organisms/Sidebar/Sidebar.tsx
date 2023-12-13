import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonMenu,
	IonList,
	IonItem,
	IonIcon,
	IonLabel,
	IonAccordion,
	IonAccordionGroup,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Logo from "../../molecules/Logo/Logo";
import style from "./Sidebar.module.css";
import { Link, useHistory } from "react-router-dom";
import {
	ellipsisHorizontal,
	logOutOutline,
	personOutline,
} from "ionicons/icons";

import {
	onAuthStateChanged,
	signOut,
	User as FirebaseAuthUser,
} from "firebase/auth";
import { auth } from "../../../../config/firebase-config";
import { menuItemList } from "../../../constant/constant";

const Sidebar: React.FC = () => {
	const [show, setShow] = useState(false);

	const handleWindowSizeChange = () => {
		setShow(window.innerWidth >= 640);
	};

	useEffect(() => {
		handleWindowSizeChange();
		window.addEventListener("resize", handleWindowSizeChange);

		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const history = useHistory();
	const [user, setUser] = useState<FirebaseAuthUser | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, []);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("Sign out successful");
				history.push("/login");
			})
			.catch((error) => {
				console.log("Sign out failed:", error);
			});
	};

	return (
		<IonMenu
			disabled={show}
			side="end"
			swipeGesture={true}
			contentId="main-content"
		>
			<IonHeader>
				<IonToolbar>
					<IonTitle>
						<Logo />
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding" color="light">
				{menuItemList.map((menu, index) => (
					<IonItem
						color="light"
						href={menu.navto}
						className={style.menuItemCtn}
						aria-hidden="true"
						key={index}
						button={true}
						lines="none"
					>
						<IonIcon
							className={style.sideIcon}
							src={`/icon/${menu.src}`}
						></IonIcon>
						<IonLabel>{menu.navname}</IonLabel>
					</IonItem>
				))}
				<IonAccordionGroup color="light">
					<IonAccordion color="light" value="first">
						<IonItem slot="header" color="light">
							<IonIcon
								className={style.sideIcon}
								icon={ellipsisHorizontal}
							></IonIcon>
							<IonLabel>More</IonLabel>
						</IonItem>
						{/* the accordion content here v */}
						{user ? (
							<>
								<IonItem button href="/profile" color="" slot="content">
									<IonIcon
										className={`${style.accordion} ${style.sideIcon}`}
										icon={personOutline}
									></IonIcon>
									<IonLabel>Profile</IonLabel>{" "}
								</IonItem>
								<IonItem button onClick={handleSignOut} color="" slot="content">
									<IonIcon
										className={`${style.accordion} ${style.sideIcon}`}
										icon={logOutOutline}
									></IonIcon>
									<IonLabel>Sign Out</IonLabel>
								</IonItem>
							</>
						) : (
							<>
								<IonItem button href="/login" color="" slot="content">
									<IonIcon
										className={`${style.accordion} ${style.sideIcon}`}
										src="/icon/login.svg"
									></IonIcon>
									<IonLabel>Sign In</IonLabel>{" "}
								</IonItem>
								<IonItem button href="/signup" color="" slot="content">
									<IonIcon
										className={`${style.accordion} ${style.sideIcon}`}
										src="/icon/signup.svg"
									></IonIcon>
									<IonLabel>Sign Up</IonLabel>
								</IonItem>
							</>
						)}
						{/* until here */}
					</IonAccordion>
				</IonAccordionGroup>
			</IonContent>
		</IonMenu>
	);
};

export default Sidebar;



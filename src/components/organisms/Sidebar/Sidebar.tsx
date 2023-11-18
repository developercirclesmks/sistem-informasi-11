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
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Logo from "../../molecules/Logo/Logo";
import style from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import AuthSide from "../../molecules/AuthSide/AuthSide";

const Sidebar: React.FC = () => {
	const [show, setShow] = useState(false);
	const [rotate, setRotate] = useState(90);
	const [showAuthSide, setShowAuthSide] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleWindowSizeChange = () => {
		setShow(window.innerWidth >= 640);
	};

	useEffect(() => {
		handleWindowSizeChange(); // Set initial value
		window.addEventListener("resize", handleWindowSizeChange);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const handleArrowClick = () => {
		setRotate(rotate === 90 ? 0 : 90);
		setShowAuthSide(!showAuthSide);
		setIsOpen(!isOpen);
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
				<IonItem
					color={isOpen ? "" : "light"}
					className={style.menuItemCtn}
					aria-hidden="true"
					button={true}
					lines="none"
					onClick={handleArrowClick}
				>
					<IonIcon className={style.sideIcon} src="/icon/more.svg"></IonIcon>
					<IonLabel>More</IonLabel>
					<IonIcon
						slot="end"
						className={style.arrows}
						src="/icon/right-arrow.svg"
						style={{
							transform: `rotate(${rotate}deg)`,
							transition: "transform 0.3s ease",
						}}
					></IonIcon>
				</IonItem>
				<div className={`${showAuthSide ? style.show : style.hide}`}>
					<AuthSide />
				</div>
			</IonContent>
		</IonMenu>
	);
};

export default Sidebar;

const menuItemList = [
	{
		navname: "Home",
		navto: "/",
		src: "home.svg",
	},
	{
		navname: "Dashboard",
		navto: "/dashboard",
		src: "dashboard.svg",
	},
	{
		navname: "Help",
		navto: "/help",
		src: "help-circle.svg",
	},
	{
		navname: "About Us",
		navto: "/about-us",
		src: "information-circle.svg",
	},
];

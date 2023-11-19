import {
	IonHeader,
	IonTitle,
	IonToolbar,
	IonContent,
	IonPage,
	IonIcon,
	IonButtons,
	IonMenuButton,
	IonSearchbar,
	IonButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Logo from "../../molecules/Logo/Logo";
import Navitem from "../../atoms/Navitem/Navitem";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import ProfileNav from "../../molecules/ProfileNav/ProfileNav";

const Navbar: React.FC = () => {
	return (
		<IonToolbar color="">
			<section className={style.mainNavbar}>
				<Logo />
				<div className={style.mid}>
					<nav className={style.navitemcontainer}>
						{navitemlist.map((nav, index) => (
							<Navitem key={index} navname={nav.navname} navto={nav.navto} />
						))}
					</nav>
				</div>
				<section className={style.right}>
					<div className={style.profileBtn}>
						<ProfileNav />
					</div>
					<IonMenuButton></IonMenuButton>
				</section>
			</section>
		</IonToolbar>
	);
};

export default Navbar;

const navitemlist = [
	{
		navname: "Home",
		navto: "/home",
	},
	{
		navname: "Dashboard",
		navto: "/dashboard",
	},
	{
		navname: "Help",
		navto: "/help",
	},
	{
		navname: "About Us",
		navto: "/about-us",
	},
	{
		navname: "Profile",
		navto: "/profile",
	},
];

import {
	IonHeader,
	IonTitle,
	IonToolbar,
	IonContent,
	IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Logo from "../../molecules/Logo/Logo";
import Navitem from "../../atoms/Navitem/Navitem";
import style from "./Navbar.module.css";

const Navbar: React.FC = () => {

	return (
		<nav className={style.main}>
			<section className={style.navbarContainer}>
				<Logo />
				<section className={style.navitemcontainer}>
					{navitemlist.map((nav, index) => (
						<Navitem key={index} navname={nav.navname} navto={nav.navto} />
					))}
				</section>
			</section>
		</nav>
	);
};


export default Navbar;

const navitemlist = [
	{
		navname: "Home",
		navto: "/",
	},
	{
		navname: "Exams",
		navto: "/",
	},
	{
		navname: "About Us",
		navto: "/about-us",
	},
	{
		navname: "Contact us",
		navto: "/",
	},
];

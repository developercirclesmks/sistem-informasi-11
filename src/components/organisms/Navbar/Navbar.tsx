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
import { menuItemList } from "../../../constant/constant";

const Navbar: React.FC = () => {
	return (
		<IonToolbar color="">
			<section className={style.mainNavbar}>
				<Logo />
				<div className={style.mid}>
					<nav className={style.navitemcontainer}>
						{menuItemList.map((nav, index) => (
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


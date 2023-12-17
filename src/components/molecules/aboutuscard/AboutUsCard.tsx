import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
} from "@ionic/react";
import React from "react";
import style from "./AboutUsCard.module.css";

interface AboutUsCardInterface {
	name: string;
	occupations: string;
	desc: string;
	img: any;
}

const AboutUsCard: React.FC<AboutUsCardInterface> = (props) => {
	const { name, occupations, desc, img } = props;
	return (
		<main className={style.main}>
			<IonCard className={`noPadding noMargin ${style.ionCard}`}>
				<section className={style.image}>
					<img className={style.img} alt="img" src={img} />
				</section>
				<section className={style.contentCtn}>
					<IonCardHeader className={`noPadding noMargin ${style.sectionHeader}`}>
						<IonCardTitle color={"primary"} className={style.name}>
							{name}
						</IonCardTitle>
						<IonCardSubtitle color={"primary"} className={`noPadding noMargin ${style.subtitle}`}>
							{occupations}
						</IonCardSubtitle>
					</IonCardHeader>

					<IonCardContent color={"primary"} className={`noPadding noMargin ${style.sectionContent}`}>
						{desc}
					</IonCardContent>
				</section>
			</IonCard>
		</main>
	);
};

export default AboutUsCard;

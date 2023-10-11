import React from "react";
import style from "./Logo.module.css";

const Logo: React.FC = () => {
	return (
		<main className={style.maincontainer} >
			<section className={style.logoPicCtn}>
				<img draggable={false} src="/icon/Logo.svg" alt="Logo" className={style.logopic}/>
			</section>
      <section className={`${style.logoText}`}>
        <span>ON Exam</span>
        <span>Online Exam Platform</span>
      </section>
		</main>
	);
};

export default Logo;

import React from "react";
import style from "./AboutUsDesc.module.css";

const AboutUsDesc: React.FC = () => {
  return (
    <main className={style.main}>
      <section className={style.desc}>
        <span className={style.desctitle}>Why ON Exam?</span>
        <span>We're the architects of educational transformation. Our platform is built on innovation, inclusivity, and the belief that learning has no limits. We're here to make your journey of creating and accessing exam rooms as seamless and rewarding as possible.</span>
      </section>
      <section className={style.images}>
        <img src="./images/aboutus1.jpg" alt="aboutus1" />
      </section>
    </main>
  );
};

export default AboutUsDesc;

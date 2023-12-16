import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
  IonCard,
} from "@ionic/react";
import React from "react";
import Navbar from "../components/organisms/Navbar/Navbar";
import style from "./styles/Help.module.css";
import HelpCard from "../components/molecules/HelpCard/HelpCard";
import HelpAsk from "../components/molecules/HelpAsk/HelpAsk";
import Sidebar from "../components/organisms/Sidebar/Sidebar";

import {
  peopleOutline,
  createOutline,
  search,
  gridOutline,
} from "ionicons/icons";
import ContactUs from "../components/organisms/ContactUs/ContactUs";

const Help: React.FC = () => {
  return (
    <>
      <Sidebar />
      <IonPage id="main-content">
        <IonHeader>
          <Navbar />
        </IonHeader>

        <IonContent fullscreen className={style.ctn}>
          <section className={style.main}>
            <section className={style.help}>
              <IonText className={style.helpText}>
                Choose a topic according to your problem
              </IonText>
              <section className={style.card}>
                {HelpList.map((card, index) => (
                  <HelpCard
                    scrollId={card.scrollId}
                    Icons={card.Icons}
                    key={index}
                    content={card.content}
                  />
                ))}
              </section>
            </section>

            <section className={style.ask}>
              <img className={style.img} src="./images/help1.png" alt="" />

              {/* <div className={style.askCtn}>
              <IonText className={style.askText}>
                Frequently asked questions
              </IonText>
              <HelpAsk />
            </div> */}
            </section>

            <section className={style.HelpCard_answer}>
              <div className={style.ans}>
                <IonText className={style.title} id="scroll-to-this1">
                  Account
                </IonText>
                <IonText className={style.title_2}>
                  Cara Daftar Akun OnExam
                </IonText>
                <IonText className={style.answer}>
                  Daftar akun OnExam semakin mudah dengan daftar menggunakan
                  Email.
                </IonText>

                <IonText className={style.title_2}>
                  Cara Login Akun OnExam
                </IonText>
                <IonText className={style.answer}>
                  Berikut beberapa langkah mudah untuk bisa login ke akun
                  OnExam.
                </IonText>
                <ul className={style.Account_list}>
                  <li>Buka halaman OnExam.</li>
                  <li>Klik Login atau Signup pada pojok kanan atas</li>
                  <li>Isi email kamu. Klik tombol Login atau Sign Up</li>
                  <li>Kemudian isi kata sandi kamu. Klik Masuk</li>
                </ul>
              </div>

              <div className={style.ans}>
                <div className={style.ans_ctn}>
                  <IonText className={style.title} id="scroll-to-this2">
                    Take the Exam
                  </IonText>
                  <IonText className={style.title_2}>
                    Cara Mengerjakan Exam
                  </IonText>
                  <IonText className={style.answer}>
                    Berikut adalah langkahnya.
                  </IonText>
                  <img className={style.ans_img}
                    src="./images/Help/TaketheExam/1.png"
                    alt="TaketheExam"
                  />
                  <IonText className={style.answer}>
                    Pilih Exam yang ingin dikerjakan. Kemudian klik View Detail.
                  </IonText>
                  <img className={style.ans_img}
                    src="./images/Help/TaketheExam/2.png"
                    alt="TaketheExam"
                  />
                  <IonText className={style.answer}>
                    Klik tombol Start Now.
                  </IonText>
                  <img className={style.ans_img}
                    src="./images/Help/TaketheExam/3.png"
                    alt="TaketheExam"
                  />
                  <IonText className={style.answer}>
                    Jawab Exam sesuai dengan soal yang ada. Jika telah selesai klik tombol Submit.
                  </IonText>
                  <img className={style.ans_img}
                    src="./images/Help/TaketheExam/4.png"
                    alt="TaketheExam"
                  />
                  <IonText className={style.answer}>
                    Klik OK untuk menyelesaikan Exam.
                  </IonText>
                </div>
              </div>

              <div className={style.ans}>
                <div className={style.ans_ctn}>
                  <IonText className={style.title} id="scroll-to-this3">
                    Searching for an Exam
                  </IonText>
                  <IonText className={style.title_2}>
                    Cara mencari Exam di OnExam
                  </IonText>
                  <IonText className={style.answer}>
                    Berikut adalah langkahnya.
                  </IonText>
                  <img className={style.ans_img}
                    src="./images/Help/SearchforExam/1.png"
                    alt="SearchingforanExam"
                  />
                  <IonText className={style.answer}>
                    Klik bagian Seach Exam pada halaman Dashboard OnExam, kemudian masukkan nama Exam yang ingin dicari.
                  </IonText>

                  <IonText className={style.title_2}>
                    Mengapa Exam Tidak Ada?
                  </IonText>
                  <IonText className={style.answer}>
                    Tidak menemukan Exam yang dicari dapat disebabkan beberapa
                    alasan, yaitu Exam belum dibuat atau kendala lainnya.
                  </IonText>
                </div>
              </div>

              <div className={style.ans}>
                <div className={style.ans_ctn}>
                  <IonText className={style.title} id="scroll-to-this4">
                    Others
                  </IonText>
                  <IonText className={style.title_2}>Edit Profile.</IonText>
                  <img className={style.ans_img}
                    src="./images/Help/Otherss/1.png"
                    alt="Others"
                  />
                  <IonText className={style.answer}>
                    Klik tombol Profile pada pojok kanan atas.
                  </IonText>
                  <img className={style.ans_img}
                    src="./images/Help/Otherss/2.png"
                    alt="Others"
                  />
                  <IonText className={style.answer}>
                    Klik tombol Edit.
                  </IonText>
                  <img className={style.ans_img}
                    src="./images/Help/Otherss/3.png"
                    alt="Others"
                  />
                  <IonText className={style.answer}>
                    Isi data yang ingin diubah. Kemudian klik tombol Save.
                  </IonText>

                  <IonText className={style.title_2}>Sign Out.</IonText>
                  <img className={style.ans_img}
                    src="./images/Help/Otherss/1.png"
                    alt="Others"
                  />
                  <IonText className={style.answer}>
                    Klik tombol Sign Out pada pojok kanan atas.
                  </IonText>
                </div>
              </div>
            </section>

            <ContactUs></ContactUs>
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Help;

const HelpList = [
  {
    scrollId: "scroll-to-this1",
    Icons: peopleOutline,
    content: "Account",
  },
  {
    scrollId: "scroll-to-this2",
    Icons: createOutline,
    content: "Take the Exam",
  },
  {
    scrollId: "scroll-to-this3",
    Icons: search,
    content: "Searching for an Exam",
  },
  {
    scrollId: "scroll-to-this4",
    Icons: gridOutline,
    content: "Others",
  },
];

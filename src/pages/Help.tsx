import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'
import Navbar from '../components/organisms/Navbar/Navbar'
import style from './Help.module.css'
import HelpCard from '../components/molecules/HelpCard/HelpCard'
import HelpAsk from '../components/molecules/HelpAsk/HelpAsk'
import Sidebar from '../components/organisms/Sidebar/Sidebar'

import {
  peopleOutline,
  createOutline,
  search,
  gridOutline,
} from 'ionicons/icons'
import ContactUs from '../components/organisms/ContactUs/ContactUs'

const Help: React.FC = () => {
  return (
    <>
      <Sidebar />
      <IonPage id='main-content'>
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
              <img className={style.img} src='./images/help1.png' alt='' />

              {/* <div className={style.askCtn}>
              <IonText className={style.askText}>
                Frequently asked questions
              </IonText>
              <HelpAsk />
            </div> */}
            </section>

            <section className={style.HelpCard_answer}>
              <div className={style.ans}>
                <IonText className={style.title} id='scroll-to-this1'>
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
                <IonText className={style.title} id='scroll-to-this2'>
                  Creating an Exam
                </IonText>
                <IonText className={style.title_2}>Cara Membuat Exam</IonText>
                <IonText className={style.answer}>
                  Berikut adalah langkahnya.
                </IonText>
              </div>

              <div className={style.ans}>
                <IonText className={style.title} id='scroll-to-this3'>
                  Searching for an Exam
                </IonText>
                <IonText className={style.title_2}>
                  Cara mencari Exam di OnExam
                </IonText>
                <IonText className={style.answer}>
                  Berikut adalah langkahnya.
                </IonText>

                <IonText className={style.title_2}>
                  Mengapa Exam Tidak Ada?
                </IonText>
                <IonText className={style.answer}>
                  Tidak menemukan Exam yang dicari dapat disebabkan beberapa
                  alasan, yaitu Exam belum dibuat atau kendala lainnya.
                </IonText>
              </div>

              <div className={style.ans}>
                <IonText className={style.title} id='scroll-to-this4'>
                  Others
                </IonText>
                <IonText className={style.title_2}>Lorem, ipsum.</IonText>
                <IonText className={style.answer}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, nisi.
                </IonText>

                <IonText className={style.title_2}>Lorem, ipsum.</IonText>
                <IonText className={style.answer}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Laborum, esse?
                </IonText>
              </div>
            </section>

            <ContactUs></ContactUs>
          </section>
        </IonContent>
      </IonPage>
    </>
  )
}

export default Help

const HelpList = [
  {
    scrollId: 'scroll-to-this1',
    Icons: peopleOutline,
    content: 'Account',
  },
  {
    scrollId: 'scroll-to-this2',
    Icons: createOutline,
    content: 'Creating an Exam',
  },
  {
    scrollId: 'scroll-to-this3',
    Icons: search,
    content: 'Searching for an Exam',
  },
  {
    scrollId: 'scroll-to-this4',
    Icons: gridOutline,
    content: 'Others',
  },
]
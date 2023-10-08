import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Navbar from '../components/organisms/Navbar/Navbar';
import Hero from '../components/organisms/Hero/Hero';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
				<Navbar/>
      </IonHeader>
      <IonContent fullscreen>
				<Hero/>
      </IonContent>
    </IonPage>
  );
};

export default Home;

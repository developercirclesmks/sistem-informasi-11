import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/fonts.css";

// Import Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
setupIonicReact();

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Switch>
					<Route exact path="/home" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/about-us" component={AboutUs} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/">
						<Redirect to="/home"/>
					</Route>
					<Route component={NotFound} />
				</Switch>
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
);
export default App;
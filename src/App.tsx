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
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import ExamDetail from "./pages/ExamDetail";
import Help from "./pages/Help";
import OnExam from "./pages/OnExam";
import ExamResult from "./pages/ExamResult";
import { ProtectedRoute } from "./pages/Auth/ProtectedRoute";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import ExamOverview from "./pages/ExamOverview";
import AdminLogin from "./pages/Auth/AdminLogin";
import ToastComponent, { showToast } from "./components/atoms/Toasts/Toasts";
import EditExamPage from "./pages/EditExamPage";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import EditQuestionPage from "./pages/EditQuestionPage";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { getUserData } from "./services/userService";
import { IUser } from "./interfaces/user";
setupIonicReact();

const App: React.FC = () => {
	const [uid, setUid] = useState<string | null>(null);
	const [userDoc, setUserDoc] = useState<IUser | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
			}
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			if (uid) {
				try {
					const userData = await getUserData(uid);
					setUserDoc(userData);
				} catch (error) {}
			}
		};

		fetchUserData();
	}, [uid]);
	return (
		<IonApp>
			<ToastComponent />
			<IonReactRouter>
				<IonRouterOutlet>
					<Switch>
						<ProtectedRoute isAuth exact path="/login" component={Login} />
						<ProtectedRoute isAuth exact path="/signup" component={SignUp} />
						<ProtectedRoute
							isAuth
							exact
							path="/admin/login"
							component={AdminLogin}
						/>

						<Route exact path="/home" component={Home} />
						<Route exact path="/about-us" component={AboutUs} />
						<Route exact path="/help" component={Help} />

						<ProtectedRoute exact path="/dashboard" component={Dashboard} />
						<ProtectedRoute exact path="/exam/:examId" component={ExamDetail} />

						<ProtectedRoute
							exact
							path="/exam/:examId/start/"
							component={OnExam}
						/>

						<ProtectedRoute
							exact
							path="/exam/:examId/result"
							component={ExamResult}
						/>

						<ProtectedRoute exact path="/profile" component={Profile} />
						<ProtectedRoute exact path="/profile/edit" component={Setting} />

						{/* AdminPage */}
							<ProtectedRoute
								exact
								path="/exam/:examId/edit"
								component={EditExamPage}
							/>
							<ProtectedRoute
								exact
								path="/exam/:examId/edit/:index(\d+)"
								component={EditQuestionPage}
							/>
							<ProtectedRoute
								exact
								path="/exam/:examId/edit/new"
								component={CreateQuestionPage}
							/>
							<ProtectedRoute
								exact
								path="/exam/:examId/overview"
								component={ExamOverview}
							/>
							
						<Route exact path="/">
							<Redirect to="/home" />
						</Route>
						<Route component={NotFound} />
					</Switch>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;

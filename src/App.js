import React, { useEffect, useState } from "react";
import Login from "./loginpage";
import Signup from "./signup";
import Home from "./home";
import firebase from "firebase";
import UserInfo from "./userInfo";
import Forgetpass from "./forgetPass";
import ResetPassword from "./ResetPass";
import Deleteac from "./deleteaccount";
import AOS from "aos";
import "aos/dist/aos.css";
import "./app.css";
import "./loader.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateValue } from "./stateprovider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PhoneVerify from "./phone";
import Loader from "./loader";
import Fullimage from "./viewPhoto";

function App() {
  const [{ islogin }, dispatch] = useStateValue();
  const [isLoading, setisLoading] = useState(false);

  useEffect(async () => {
    setisLoading(true);
    AOS.init({
      duration: 1000,
    });
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "USER_LOGIN",
        });
      }
    });
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Router>
            <Switch>
              <Route exact path="/viewFullimage" component={Fullimage} />
              <Route exact path="/userinfo" component={UserInfo} />
              <Route exact path="/resetpass" component={ResetPassword} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/phone" component={PhoneVerify} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/deleteAccount" component={Deleteac} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/phone" component={PhoneVerify} />
              <Route exact path="/forgetpass" component={Forgetpass} />
              <Redirect to="/home" />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;

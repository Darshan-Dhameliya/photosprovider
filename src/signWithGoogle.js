import React from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./stateprovider";
import Phone from "./images/phone.png";
import Google from "./images/google.png";

export default function SignWithGoogle() {
  const history = useHistory();
  const [{ islogin }, dispatch] = useStateValue();

  const loginGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: "USER_LOGIN",
        });
        history.push("/home");
        // ...
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="p-0 text-center row p-0 border-bottom pb-4">
        <div className="col-md-12 col-lg-6 p-0">
          <button
            className="btn bigbutton m-0 w-auto mt-2"
            onClick={() => loginGoogle()}
          >
            <div className="d-flex justify-content-center h-100 align-items-center p-0">
              <img
                style={{ height: "30px" }}
                src={Google}
                alt="something went wrong"
              />
              <span className="ps-3">Sign in with Google</span>
            </div>
          </button>
        </div>
        <div className="col-lg-6 p-0 mt-2">
          <button
            className="btn bigbutton m-0 w-auto"
            onClick={() => history.push("/phone")}
          >
            <div className="d-flex justify-content-center h-100 align-items-center p-0">
              <img
                style={{ height: "30px" }}
                src={Phone}
                alt="something went wrong"
              />
              <span className="ps-3">Sign in with Number</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

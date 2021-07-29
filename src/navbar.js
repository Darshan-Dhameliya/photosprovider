import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./stateprovider";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import AltImage from "./images/altImage.png";
import { useLocation } from "react-router-dom";

export default function Navbar(props) {
  const location = useLocation();
  const [{ islogin }, dispatch] = useStateValue();
  const history = useHistory();
  const [sideHeight, setsideHeight] = useState(0);
  const [userInfo, setuserInfo] = useState({
    islogin: false,
    userName: "Guest",
    userImage: AltImage,
  });

  const resetpass = () => {
    setsideHeight(0);
    history.push("/resetpass");
  };

  const goTohome = () => {
    setsideHeight(0);
    history.push("/home");
  };

  const updateAccount = () => {
    setsideHeight(0);
    history.push("/userinfo");
  };
  const gotoLogin = () => {
    setsideHeight(0);
    history.push("/login");
  };

  const deleteAccount = () => {
    setsideHeight(0);
    history.push("/deleteAccount");
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "USER_LOGOUT",
        });
        history.push("/login");
      })
      .catch((error) => {});
  };

  const getLoginmethod = async () => {
    const user = await firebase.auth().currentUser;
    if (!!user)
      setuserInfo({
        userName: user.displayName,
        userImage: user.photoURL,
        islogin: true,
      });
  };

  useEffect(() => {
    getLoginmethod();
  }, []);

  const serchPhotos = (e) => {
    e.preventDefault();
    if (location.pathname === "/home") {
      if (e.target[0].value.trim().length !== 0) {
        props.serchBycategories(e.target[0].value);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        e.target[0].value = "";
      }
    } else {
      history.push("home");
    }
  };

  const gotoHOme = () => {
    props.serchBycategories("all");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <img
            src={logo}
            className="navbar-logo"
            alt="something went wrong"
            onClick={() => gotoHOme()}
          />
          <form onSubmit={(e) => serchPhotos(e)} style={{ width: "50%" }}>
            <div className="input-group">
              <input
                type="search"
                className="form-control form-control-search"
              />
              <button
                className="input-group-text d-flex justify-content-center align-items-center"
                type="submit"
                title="Search"
              >
                <BiSearchAlt className="fs-4" />
              </button>
            </div>
          </form>

          <div
            className="d-flex justify-content-center align-items-center navbarImage"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="A/C Settings"
          >
            <img
              src={userInfo.userImage}
              className="me-2 rounded-circle h-100"
              alt="something went wrong"
            />
            <span className="m-3 navbarusername">{userInfo.userName} </span>
            <AiOutlineMenu
              className="fs-1 ms-1"
              onClick={() => setsideHeight(100)}
            />
          </div>
        </div>
      </nav>
      <div className="overlay" style={{ height: `${sideHeight}%` }}>
        <span className="closebtn" onClick={() => setsideHeight(0)}>
          &times;
        </span>
        <div className="overlay-content">
          <span onClick={goTohome}>Home</span>

          {userInfo.islogin ? (
            <>
              <span onClick={resetpass}>Reset Password</span>
              <span onClick={deleteAccount}>Delete Account</span>
              <span onClick={updateAccount}>Update Account</span>
              <span onClick={signOut}>Sign Out</span>
            </>
          ) : (
            <span disables onClick={gotoLogin}>
              Login
            </span>
          )}
        </div>
      </div>
    </>
  );
}

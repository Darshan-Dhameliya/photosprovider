import React, { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./navbar";

export default function Deleteaccount() {
  const history = useHistory();

  const [reasonOption] = useState([
    ".................",
    "Concerned about your data",
    "Trouble getting started",
    "Too busy/too distracting",
    "Created a second account",
    "Privacy concerns",
    "Something else",
  ]);

  const deleteAccount = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    user
      .delete()
      .then(function () {
        toast.error("Your Account has been deleted Successfully", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        history.push("/login");
      })
      .catch(function (error) {
        var errorMessage = error.message;
        toast.error(errorMessage, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="container-600 pt-5 container ">
        <div className=" mt-5 p-5 bg-white border-container">
          <form onSubmit={(e) => deleteAccount(e)}>
            <div className="form-group">
              <label htmlFor="cars" className="me-2">
                Why do you want to delete your account ? :
              </label>
              <select className="form-slect">
                {reasonOption.map((item, index) => (
                  <>
                    <option>{item}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="form-group mt-5">
              <b>
                Make sure you are signed in recently deleting your account. If
                you are not signed in recently, first logout and then after
                login and then Delete your account
              </b>
              . Your profile won't appear while you're away.
              <br />
              <br />
              if You delete your account you can not login if you wont to login
              first you must have to register your account and after you can
              login back with your account
            </div>
            <div className="form-group mt-4">
              <button type="submit" className="bigbutton">
                Delete My account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

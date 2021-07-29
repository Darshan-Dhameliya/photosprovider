import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import firebase from "firebase";
import Navbar from "./navbar";
import { useStateValue } from "./stateprovider";
import LoaderButton from "./loaderButton";

export default function ForgetPass() {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [file, setFile] = useState("");
  const [{ islogin }, dispatch] = useStateValue();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .matches(
        /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        "enter Valid Username"
      ),
  });

  const validate = (values) => {
    const errors = {};
    var regex = /^\s+$/;
    if (!values.username || regex.test(values.username)) {
      errors.username = "Required";
    }
    return errors;
  };

  const updateProfile = async (values, event) => {
    setisLoading(true);
    const user = firebase.auth().currentUser;
    const imgname = file.name;
    const img = file;
    const storage = firebase.storage();
    if (user !== null) {
      const uploadTask = storage.ref(`images/${imgname}`).put(img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(imgname)
            .getDownloadURL()
            .then((url) => {
              user
                .updateProfile({
                  displayName: values.username,
                  photoURL: url,
                })
                .then(function () {
                  dispatch({
                    type: "USER_LOGIN",
                  });
                  history.push("/home");
                  // Update successful.
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
        }
      );
    }
    setisLoading(false);
  };

  const goTohome = () => {
    dispatch({
      type: "USER_LOGIN",
    });
    history.push("/home");
  };

  return (
    <>
      <Navbar />
      <div
        className="container container-600 d-flex justify-content-center align-items-center pt-5"
        data-aos="zoom-out"
      >
        <div className="bg-white border-container p-5 mt-5 mx-1  align-self-center row">
          <h1 className="mb-5 text-center p-0">Enter Your Details</h1>
          <Formik
            initialValues={{
              username: "",
            }}
            validationSchema={SignupSchema}
            validate={validate}
            onSubmit={updateProfile}
          >
            {({ errors, touched }) => (
              <Form className="p-0">
                <div className="form-group mt-4">
                  username :
                  <Field
                    name="username"
                    type="text"
                    className="form-control mt-3"
                  />
                  {errors.username && touched.username ? (
                    <div className="error">{errors.username}</div>
                  ) : null}
                </div>
                <div className="form-group mt-4">
                  File :
                  <input
                    required
                    name="file"
                    type="file"
                    accept="image/x-png,image/jpeg"
                    className="form-control mt-3"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="form-group mt-4">
                  <LoaderButton isLoading={isLoading}>Save</LoaderButton>
                  <button onClick={() => goTohome()} className="bigbutton">
                    Go to Home
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

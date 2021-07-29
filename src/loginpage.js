import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "firebase";
import { useStateValue } from "./stateprovider";
import GoogleSign from "./signWithGoogle";
import LoaderButton from "./loaderButton";

export default function Loginpage() {
  const history = useHistory();
  const [{ islogin }, dispatch] = useStateValue();
  const [isLoading, setisLoading] = useState(false);

  const login = async (values, event) => {
    setisLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          if (user.displayName && user.photoURL) {
            history.push("/userinfo");
          } else {
            dispatch({
              type: "USER_LOGIN",
            });
            history.push("/home");
          }
          event.resetForm();
        } else {
          toast.error("please verify your Email", {
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      })
      .catch((error) => {
        var errorMessage = error.message;
        toast.error(errorMessage, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
    setisLoading(false);
  };

  const validate = (values) => {
    const errors = {};
    var regex = /^\s+$/;
    if (!values.email || regex.test(values.email)) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (regex.test(values.password)) {
      errors.password = "Required";
    }
    return errors;
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <>
      <div
        className="container container-600 d-flex justify-content-center align-items-center"
        data-aos="zoom-out"
      >
        <div className="bg-white border-container p-5 align-self-center row mt-3 mx-1">
          <h1 className="mb-5 text-center">Login </h1>
          <GoogleSign />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            validate={validate}
            onSubmit={login}
          >
            {({ errors, touched }) => (
              <Form className="p-0">
                <div className="form-group mt-4">
                  Email :
                  <Field
                    name="email"
                    type="email"
                    className="form-control mt-3"
                  />
                  {errors.email && touched.email ? (
                    <div className="error">{errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group mt-4">
                  Password :
                  <Field
                    name="password"
                    type="password"
                    className="form-control mt-3"
                  />
                  {errors.password && touched.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>
                <div className="form-group mt-4">
                  <h6
                    onClick={() => history.push("/forgetpass")}
                    style={{ cursor: "pointer" }}
                  >
                    Forget Password ?
                  </h6>
                  <LoaderButton isLoading={isLoading}>Login</LoaderButton>
                  <button
                    onClick={() => history.push("/signup")}
                    className="bigbutton"
                  >
                    Go For Sign Up
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

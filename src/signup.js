import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { toast } from "react-toastify";
import GoogleSign from "./signWithGoogle";
import LoaderButton from "./loaderButton";
import { useStateValue } from "./stateprovider";

export default function Signuppage() {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [{ islogin }, dispatch] = useStateValue();

  const createUser = async (values, event) => {
    setisLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        var user = userCredential.user;
        user
          .sendEmailVerification()
          .then(function () {
            // Email sent.
          })
          .catch(function (error) {
            // An error happened.
          });
        if (user.emailVerified) {
          // User is signed in.
          dispatch({
            type: "USER_LOGIN",
          });
          history.push("/home");
        } else {
          // No user is signed in.
          toast.error("please verify your email", {
            autoClose: 3000,
            hideProgressBar: true,
          });
          history.push("/login");
        }
        event.resetForm();
      })
      .catch((error) => {
        var errorMessage = error.message;
        toast.error(errorMessage, {
          autoClose: 2500,
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
    if (!values.c_password) {
      errors.c_password = "Required";
    } else if (regex.test(values.c_password)) {
      errors.c_password = "Required";
    } else if (values.password !== values.c_password) {
      errors.c_password = "Both Password Must Be Same";
    }
    return errors;
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    c_password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <>
      <div
        className="container container-600 d-flex justify-content-center align-items-center"
        data-aos="zoom-in"
      >
        <div className="bg-white border-container p-5  mx-1 mt-2 align-self-center row">
          <h1 className="mb-5 text-center">Register </h1>
          <GoogleSign />
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              c_password: "",
            }}
            validationSchema={SignupSchema}
            validate={validate}
            onSubmit={createUser}
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
                <div className="form-group mt-4 mb-1">
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

                <div className="form-group mt-5">
                  Confirm Password :
                  <Field
                    name="c_password"
                    type="password"
                    className="form-control mt-3"
                  />
                  {errors.c_password && touched.c_password ? (
                    <div className="error">{errors.c_password}</div>
                  ) : null}
                </div>
                <div className="form-group mt-4">
                  <LoaderButton isLoading={isLoading}>Sign Up </LoaderButton>
                  <button
                    onClick={() => history.push("/login")}
                    className="bigbutton"
                  >
                    Back To Login
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

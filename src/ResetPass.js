import React, { useState } from "react";
import firebase from "firebase";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderButton from "./loaderButton";
import Navbar from "./navbar";

export default function DeleteAccount() {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);

  const resetPass = async (values, event) => {
    setisLoading(true);

    const user = await firebase.auth().currentUser;
    const credential = await firebase.auth.EmailAuthProvider.credential(
      user.email,
      values.o_password
    );
    if (user !== null) {
      user
        .reauthenticateWithCredential(credential)
        .then(function () {
          user
            .updatePassword(values.n_password)
            .then(function () {
              toast.error(
                "succesfully update your password now you can login with new password",
                {
                  autoClose: 2000,
                  hideProgressBar: true,
                }
              );
              history.push("/home");
              event.resetForm();
            })
            .catch(function (error) {
              var errorMessage = error.message;
              toast.error(errorMessage, {
                autoClose: 2000,
                hideProgressBar: true,
              });
            });
        })
        .catch(function (error) {
          var errorMessage = error.message;
          toast.error(errorMessage, {
            autoClose: 2000,
            hideProgressBar: true,
          });
        });
    }
    setisLoading(false);
  };

  const validate = (values) => {
    const errors = {};
    var regex = /^\s+$/;
    if (regex.test(values.o_password)) {
      errors.o_password = "Required";
    }
    if (regex.test(values.n_password)) {
      errors.n_password = "Required";
    }
    if (regex.test(values.c_password)) {
      errors.c_password = "Required";
    } else if (values.n_password !== values.c_password) {
      errors.c_password = "Both Password Must Be Same";
    }
    return errors;
  };
  const SignupSchema = Yup.object().shape({
    n_password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    c_password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    o_password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  return (
    <>
      <Navbar />
      <div className="container container-600 d-flex justify-content-center align-items-center pt-5">
        <div className="bg-white border-container p-5 mt-5 align-self-center row">
          <h1 className="mb-5 text-center">Reset Password </h1>
          <Formik
            initialValues={{
              o_password: "",
              n_password: "",
              c_password: "",
            }}
            validationSchema={SignupSchema}
            validate={validate}
            onSubmit={resetPass}
          >
            {({ errors, touched }) => (
              <Form className="p-0">
                <div className="form-group mt-4">
                  Old Password :
                  <Field
                    name="o_password"
                    type="password"
                    className="form-control mt-3"
                  />
                  {errors.o_password && touched.o_password ? (
                    <div className="error">{errors.o_password}</div>
                  ) : null}
                </div>
                <div className="form-group mt-4 mb-1">
                  New Password :
                  <Field
                    name="n_password"
                    type="password"
                    className="form-control mt-3"
                  />
                  {errors.n_password && touched.n_password ? (
                    <div className="error">{errors.n_password}</div>
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
                <div className="form-group mt-3">
                  <h6
                    onClick={() => history.push("/forgetpass")}
                    style={{ cursor: "pointer" }}
                  >
                    Forget Password ?
                  </h6>
                  <LoaderButton isLoading={isLoading}>
                    Reset Password
                  </LoaderButton>
                  <button
                    onClick={() => history.push("/home")}
                    className="bigbutton"
                  >
                    Back To Home
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

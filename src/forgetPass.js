import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import firebase from "firebase";
import { toast } from "react-toastify";
import LoaderButton from "./loaderButton";

export default function ForgetPass() {
  const [isLoading, setisLoading] = useState(false);

  const history = useHistory();
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const passwordSendmail = async (values, event) => {
    setisLoading(true);
    await firebase
      .auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        event.resetForm();
        toast.error(
          "we sent a mail in your email plese check your inbox and reset your password",
          {
            autoClose: 3000,
            hideProgressBar: true,
          }
        );
      })
      .catch((err) => {
        var errorMessage = err.message;
        toast.error(errorMessage, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
    setisLoading(false);
  };

  return (
    <>
      <div
        className="container container-600 d-flex justify-content-center align-items-center pt-5"
        data-aos="zoom-out"
      >
        <div className="bg-white border-container p-5 mt-5 mx-1 align-self-center row">
          <h1 className="mb-5 text-center p-0">Forget Password </h1>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={passwordSendmail}
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
                  <LoaderButton isLoading={isLoading}>Send Email</LoaderButton>

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

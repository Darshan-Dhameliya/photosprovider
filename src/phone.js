import React, { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useStateValue } from "./stateprovider";
import LoaderButton from "./loaderButton";

export default function Phone() {
  const history = useHistory();
  const [otp, setOtp] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [confrmation, setconfrmation] = useState("");
  const [{ islogin }, dispatch] = useStateValue();
  const sendOtp = async (values) => {
    setisLoading(true);
    const recaptcha = await new firebase.auth.RecaptchaVerifier("recaptcha", {
      size: "invisible",
    });
    var number = "+91" + values.phonenum;
    await firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (confrmation) {
        toast.error(
          "we sent a otp in your mobile number plese check your meassges",
          {
            autoClose: 3000,
            hideProgressBar: true,
          }
        );
        setconfrmation(confrmation);
        setOtp(false);
      })
      .catch(function (error) {
        console.error(error);
      });
    setisLoading(false);
  };

  const verifyOtp = async (values) => {
    setisLoading(true);
    await confrmation
      .confirm(values.otp)
      .then(function (result) {
        toast.error("otp verification success", {
          autoClose: 3000,
          hideProgressBar: true,
        });
        dispatch({
          type: "USER_LOGIN",
        });
        history.push("/userinfo");
      })
      .catch(function (error) {
        setOtp("");
        toast.error("please enter right otp", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      });
    setisLoading(false);
  };

  const NumberSchema = Yup.object().shape({
    phonenum: Yup.string()
      .min(10, "Enter Valid Number")
      .max(10, "Enter Valid Number")
      .matches(/^[0-9]*$/, "Enter Valid Number")
      .required("Required"),
  });

  const OtpSchema = Yup.object().shape({
    otp: Yup.string()
      .min(6, "Enter Valid Otp")
      .max(6, "Enter Valid Otp")
      .matches(/^[0-9]*$/, "Enter Valid Otp")
      .required("Required"),
  });

  return (
    <div>
      <div className="container container-600  mt-5">
        <div data-aos="zoom-in" className="mx-1 p-5 bg-white border-container">
          <div className="fs-1 text-center"> Login/Signup </div>
          {otp && (
            <Formik
              initialValues={{
                phonenum: "",
              }}
              validationSchema={NumberSchema}
              onSubmit={sendOtp}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <div className="form-group mt-4">
                    Phone Number :
                    <div className="input-group mt-3">
                      <span className="input-group-text">+91</span>
                      <Field
                        type="text"
                        name="phonenum"
                        className="form-control"
                      />
                    </div>
                    {errors.phonenum && touched.phonenum ? (
                      <div className="error">{errors.phonenum}</div>
                    ) : null}
                  </div>
                  <div className="form-group mt-4">
                    <LoaderButton isLoading={isLoading}>Send Otp</LoaderButton>
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
          )}

          {!otp && (
            <div data-aos="zoom-in">
              <Formik
                initialValues={{
                  otp: "",
                }}
                validationSchema={OtpSchema}
                onSubmit={verifyOtp}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group mt-4">
                      Otp :
                      <div className="input-group mt-3">
                        <Field
                          type="text"
                          name="otp"
                          className="form-control"
                        />
                      </div>
                      {errors.otp && touched.otp ? (
                        <div className="error">{errors.otp}</div>
                      ) : null}
                      <div className="form-group mt-3">
                        <LoaderButton isLoading={isLoading}>
                          Verify Otp
                        </LoaderButton>
                        <div
                          className="bigbutton text-center btn"
                          onClick={() => window.location.reload(true)}
                        >
                          Wrong Number ?
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
      <div id="recaptcha"></div>
    </div>
  );
}

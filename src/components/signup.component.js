/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "react-credit-cards/es/styles-compiled.css";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import AuthService from "../services/auth.service";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_live_51Hh10CKbXv9EF1kkRtVp2h2Yx5xJn9l1IFMzSwspPvTDG9DlzzZknze0wOp3lJzgiOoJCRi9WO6yhKFzbCNhIVJj00RgRk4IDM"
);

// const stripePromise = loadStripe(
//   "pk_test_51Hh10CKbXv9EF1kksnmf4t1Mv2Up8y9Lb8LYezhFl7f21dNYbN5NdEGma2aH71exDEBKbbasZvtgFonQwXKCzQHw00xHKC2IFG"
// );

const CheckoutForm = () => {
  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState(null);
  const [cardExpiryError, setCardExpiryError] = useState(false);
  const [cardCvcError, setCardCvcError] = useState(false);
  const [plan, setPlan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(null);

  const [completed, setCompleted] = useState(false);

  const getToken = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const res = await stripe.createToken(cardNumberElement);

    console.log(res);

    if (
      res?.error?.code === "incomplete_number" ||
      res?.error?.code === "invalid_number"
    ) {
      setCardNumberError(true);
      setCardNumberErrorMessage(res?.error?.message);

      return null;
    } else {
      setCardNumberError(false);
      setCardNumberErrorMessage(null);
    }

    if (
      res?.error?.code === "invalid_expiry_year_past" ||
      res?.error?.code === "incomplete_expiry"
    ) {
      setCardExpiryError(true);
      return;
    } else {
      setCardExpiryError(false);
    }

    if (res?.error?.code === "incomplete_cvc") {
      setCardCvcError(true);
      return;
    } else {
      setCardCvcError(false);
    }

    console.log(res?.token?.id);

    setToken(res?.token?.id);

    return res?.token?.id;
  };

  const isEmail = (val) => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);


    const token = await getToken();

    console.log("token", token);

    if (token) {
      if (!name) {
        toast.error("Fullname must not empty.");
        setSubmitting(false);
        return;
      }

      if (!password) {
        if (password.length < 6) {
          toast.error("Password must be atleast 6 characters");
          setSubmitting(false);
          return;
        }
        toast.error("Password must not empty.");
        setSubmitting(false);
        return;
      }

      if (!email) {
        toast.error("Email must not be empty.");
        setSubmitting(false);
        return;
      } else {
        if (isEmail(email) === false) {
          toast.error("Invalid email address.");
          setSubmitting(false);
          return;
        }
      }

      const payload = {
        email: email,
        token: token,
        name: name,
        genre: genre || "-",
        password: password,
      };

      try {
        const resp = await AuthService.signup(payload);

        if(resp.data?.error) {

           toast.error(resp.data?.message);

           setSubmitting(false);


        } else {

          setSubmitting(false);

          setCompleted(true);

          toast.success("Your PlaylistGoats subscription completed successfully!");
        }


      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.error("Please complete all the required fields.");
      setSubmitting(false);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
             window.location = "/"
        }
  }, []);

  const handleChange = async (e) => {
    await getToken();
  };

  return (
    <main class="main" id="top">
      <div class="container-fluid">
        <div class="row min-vh-100 flex-center g-0">
          <div class="col-lg-8 col-xxl-5 py-3 position-relative">
            <img
              class="bg-auth-circle-shape"
              src="/assets/img/icons/spot-illustrations/bg-shape.png"
              alt=""
              width="250"
            />
            <img
              class="bg-auth-circle-shape-2"
              src="/assets/img/icons/spot-illustrations/shape-1.png"
              alt=""
              width="150"
            />
            <div class="card overflow-hidden z-index-1">
              <div class="card-body p-0">
                <div class="row g-0 h-100">
                  <div class="col-md-5 text-center bg-card-gradient">
                    <div class="position-relative p-4 pt-md-5 pb-md-7 light">
                      <div
                        class="bg-holder bg-auth-card-shape"
                        style={{}}
                      ></div>

                      <div class="z-index-1 position-relative">
                        <a
                          class="link-light mb-4 font-sans-serif fs-4 d-inline-block fw-bolder"
                          href="/"
                        >
                          PlaylistGOATS
                        </a>
                        <p class="opacity-75 text-white">
                          Register your PlaylistGOATS account.
                          <br />
                          <br />
                          <br />
                          <br />
                          <img src="/assets/img/logo.png" alt="" width="90" />
                        </p>
                      </div>
                    </div>
                    <div class="mt-3 mb-4 mt-md-4 mb-md-5 light">
                      <p class="pt-3 text-white">
                        Have an account?
                        <br />
                        <a
                          class="btn btn-outline-light mt-2 px-4"
                          href="/login"
                        >
                          Log In
                        </a>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-7 d-flex flex-center">
                    {completed ? (
                      <>
                        <div className="alert alert-success" role="alert">
                          <strong>Congratulations!</strong> Please <a href="/login" className="text-info">login</a> to continue
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="p-4 p-md-5 flex-grow-1">
                          <h3 className="mb-4">Set up your account</h3>
                          <Form>
                            <div class="mb-3">
                              <label class="form-label" for="card-email">
                                Your Name<span className="text-danger">*</span>
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter your name"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div class="mb-3">
                              <label class="form-label" for="card-email">
                                Email address
                                <span className="text-danger">*</span>
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Enter email address"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div class="row gx-2">
                              <div class="mb-3 col-sm-6">
                                <label class="form-label" for="card-password">
                                  Password<span className="text-danger">*</span>
                                </label>
                                <Input
                                  type="password"
                                  className="form-control"
                                  placeholder="Enter password"
                                  name="password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              <div class="mb-3 col-sm-6">
                                <label class="form-label" for="card-password">
                                  What is your genre?
                                </label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="genre"
                                  placeholder="Enter your genre"
                                  onChange={(e) => setGenre(e.target.value)}
                                />
                              </div>
                            </div>

                            <div class="square border border-secondary card mb-4 box-shadow">
                              <div className="card-header">
                                <h5 className="my-0 font-weight-normal">
                                  $99 <small class="text-muted">/ mo</small>
                                </h5>
                              </div>
                              <div className="card-body">
                                {/* <h1 className="card-title pricing-card-title">
                              $99 <small class="text-muted">/ mo</small>
                            </h1> */}
                                <ol className="mb-4">
                                  <li>50k plus curators</li>
                                  <li>unlimited playlist submissions</li>
                                  <li>unlimited playlist analytics</li>
                                  <li>botted playlist checker</li>
                                  <li>priority email support</li>
                                </ol>
                              </div>
                            </div>

                            <div class="mb-5 mt-4">
                              <label class="form-label" for="card-password">
                                Card Number
                                <span className="text-danger">*</span>
                              </label>
                              <CardNumberElement
                                onChange={handleChange}
                                options={{
                                  style: {
                                    base: {
                                      color: "#D0D5DD",
                                      fontSize: "18px",
                                      fontFamily: "SF Pro",
                                      fontWeight: "normal",
                                    },
                                  },
                                  showIcon: true,
                                  placeholder: "3453 3434 7891 1100",
                                }}
                                className="form-control"
                              />
                              {cardNumberError && cardNumberErrorMessage && (
                                <div className="w-[476px] h-[19px] justify-start items-center inline-flex text-danger mt-3">
                                  <div className="text-rose-600 text-sm font-normal font-['SF Pro'] leading-[19px]">
                                    {cardNumberErrorMessage}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div class="row gx-2">
                              <div class="mb-3 col-sm-6">
                                <label class="form-label" for="card-password">
                                  Expiry<span className="text-danger">*</span>
                                </label>
                                <CardExpiryElement
                                  onChange={handleChange}
                                  options={{
                                    style: {
                                      base: {
                                        color: "#D0D5DD",
                                        fontSize: "18px",
                                        fontFamily: "SF Pro",
                                        fontWeight: "normal",
                                      },
                                    },
                                    placeholder: "MM/YY",
                                  }}
                                  className={
                                    cardExpiryError
                                      ? "form-control border-danger"
                                      : "form-control"
                                  }
                                />
                              </div>
                              <div class="mb-3 col-sm-6">
                                <label class="form-label" for="card-password">
                                  CVC<span className="text-danger">*</span>
                                </label>
                                <CardCvcElement
                                  onChange={handleChange}
                                  options={{
                                    style: {
                                      base: {
                                        color: "#D0D5DD",
                                        fontSize: "18px",
                                        fontFamily: "SF Pro",
                                        fontWeight: "normal",
                                      },
                                    },
                                    placeholder: "123",
                                  }}
                                  className={
                                    cardCvcError
                                      ? "form-control border-danger"
                                      : "form-control"
                                  }
                                />
                              </div>
                            </div>
                            <br />

                            <div class="form-check mt-3">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="card-register-checkbox"
                              />
                              <label
                                class="form-label"
                                for="card-register-checkbox"
                              >
                                I accept the <a href="">terms </a>and{" "}
                                <a href="">privacy policy</a>
                              </label>
                            </div>

                            <div class="mb-3">
                              <button
                                class="btn btn-primary d-block w-100 mt-3"
                                type="submit"
                                name="submit"
                                disabled={submitting}
                                onClick={handleSubmit}
                              >
                                {submitting ? "Signing up..." : "Register"}{" "}
                              </button>
                            </div>

                            <CheckButton
                              style={{
                                display: "none",
                              }}
                            />
                          </Form>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </main>
  );
};

const Signup = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Signup;

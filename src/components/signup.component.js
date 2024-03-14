/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { ToastContainer, toast } from 'react-toastify';
import InputMask from 'react-input-mask';


const required = (value,) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const validateCardDetails = (cardNumber, expiry, cvc) => {
  // Check if the card number is valid
  if (cardNumber.split(' ').join('').length !== 16) {
    return false;
  }

  // Check if the expiry date is in MM/YY format
  if (expiry?.split('/')?.[0]?.length !== 2 || expiry?.split('/')?.[1]?.length !== 2) {
    return false;
  }

  // Check if the CVV is a three-digit number
  if (!/^\d{3}$/.test(cvc)) {
    return false;
  }
  return true

}

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangePlan = this.onChangePlan.bind(this);

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeActivationCode = this.onChangeActivationCode.bind(this);
    this.state = {
      currentStep: 1,
      email: "",
      name: "",
      password: "",
      activationCode: "",
      genre: "",
      loading: false,
      redirect: false,
      message: "",
      cvc: "",
      expiry: "",

      number: "",
      focus: "",
      plan: "monthly",

    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePlan(e) {
    this.setState({ plan: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeGenre(e) {
    this.setState({ genre: e.target.value });
  }

  onChangeActivationCode(e) {
    this.setState({ activationCode: e.target.value });
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  componentWillMount() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) this.setState({ redirect: "/" });

    if (this.props.match.params.activation) {
      this.setState({
        email: this.props.match.params.email,
        activationCode: this.props.match.params.activation,
      });
    }
  }

  async handleSignup(e) {
    e.preventDefault();
    if (!validateCardDetails(this.state.number, this.state.expiry, this.state.cvc)) {
      toast.error('Invalid card details provided.');
      return;
    }

    this.setState({ message: "", loading: true });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

      try {
        const signupPayload = {
          "email": this.state.email,
          "expiryMonth": this.state.expiry.split('/')[0],
          "expiryYear": this.state.expiry.split('/')[1],
          "cardNumber": this.state.number.split(' ').join(''),
          "cvc": this.state.cvc,
          "plan": this.state.plan,
          "name": this.state.name,
          "genre": this.state.genre,
          "password": this.state.password,
        }
        console.log(signupPayload, "signupPayload")
        await AuthService.signup(signupPayload);
        AuthService
          .login(this.state.email, this.state.password)
          .then(() => {
            this
              .props
              .history
              .push("/");
            window
              .location
              .reload();
          }, error => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(resMessage);
            this.setState({ loading: false });
          });


      } catch (error) {

        toast.error(error.message);
      }

    } else {

      this.setState({ loading: false });
    }
  }

  isValidStepOne() {
    const isValidEmail = isEmail(this.state.email);
    const isValidName = this.state.name?.length
    const isValidPassword = this.state.password?.length.length < 6 || this.state.password?.length.length > 40;
    const isValidGenere = this.state.genre?.length;
    return isValidEmail && isValidName && isValidPassword && isValidGenere;
  }


  render() {
    if (this.state.redirect) {
      this.props.history.push(this.state.redirect);
      window.location.reload();
    }
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
                      <div class="p-4 p-md-5 flex-grow-1">
                        <h3 className="mb-4">
                          {this.state.currentStep === 1
                            ? "Set up your account"
                            : "Billing"}
                        </h3>
                        <Form
                          onSubmit={this.handleSignup}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >
                          {this.state.currentStep === 1 && (
                            <>
                              <div class="mb-3">
                                <label class="form-label" for="card-email">
                                  Your Name
                                </label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  placeholder="Enter your name"
                                  value={this.state.name}
                                  onChange={this.onChangeName}
                                  validations={[required]}
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label" for="card-email">
                                  Email address
                                </label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="email"
                                  placeholder="Enter email address"
                                  value={this.state.email}
                                  onChange={this.onChangeEmail}
                                  validations={[required, email]}
                                />
                              </div>
                              <div class="row gx-2">
                                <div class="mb-3 col-sm-6">
                                  <label class="form-label" for="card-password">
                                    Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required, vpassword]}
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
                                    value={this.state.genre}
                                    onChange={this.onChangeGenre}
                                    validations={[required]}
                                  />
                                </div>
                              </div>

                            </>
                          )}

                          {this.state.currentStep === 2 && (
                            <>
                              <Cards
                                cvc={this.state.cvc}
                                expiry={this.state.expiry}
                                focused={this.state.focus}
                                name={this.state.name}
                                number={this.state.number}
                              />

                              <div class="mb-5 mt-4">
                                <label class="form-label" for="card-password">
                                  Card Number
                                </label>
                                <InputMask
                                  mask="9999 9999 9999 9999"
                                  className="form-control"
                                  type="tel"
                                  name="number"
                                  placeholder="Card Number"
                                  value={this.state.number}
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                  validations={[required]}
                                />
                              </div>
                              <div class="row gx-2">
                                <div class="mb-3 col-sm-6">
                                  <label class="form-label" for="card-password">
                                    Expiry
                                  </label>
                                  <InputMask
                                    mask="99/99"
                                    className="form-control"
                                    placeholder="MM/YY"
                                    name="expiry"
                                    value={this.state.expiry}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    validations={[required]}
                                  />
                                </div>
                                <div class="mb-3 col-sm-6">
                                  <label class="form-label" for="card-password">
                                    CVC
                                  </label>
                                  <InputMask
                                    mask="999"
                                    type="text"
                                    className="form-control"
                                    name="cvc"
                                    placeholder="CVC"
                                    value={this.state.cvc}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    validations={[required]}
                                  />
                                </div>
                              </div>
                              <br />
                              <strong className=""> Subscription Plan</strong>
                              <div className="d-flex mt-3">
                                <div class="form-check form-check-inline">
                                  <input
                                    onChange={this.onChangePlan}
                                    className="form-check-input" type="radio" name="plan" value="monthly" checked />
                                  <label className="form-check-label">Monthly $99</label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    onChange={this.onChangePlan}
                                    className="form-check-input" type="radio" name="plan" value="yearly" />
                                  <label className="form-check-label text-nowrap">Yearly $999</label>
                                </div>
                              </div>

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
                            </>
                          )}

                          {this.state.currentStep === 1 ? (
                            <>
                              <div class="mb-3">
                                <button
                                  disabled={(this.state.name && this.state.genre && this.state.name && this.state.password) ? false : true}
                                  onClick={() => {
                                    if (this.state.currentStep === 2) {
                                      this.setState({ currentStep: 1 });
                                    } else {
                                      this.setState({ currentStep: 2 });
                                    }
                                  }}
                                  class="btn btn-primary d-block w-100 mt-3"
                                  type="button"
                                >
                                  {this.state.currentStep === 1
                                    ? "Next"
                                    : "Previous"}
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div class="mb-3">
                                <button
                                  onClick={() => {
                                    if (this.state.currentStep === 1 && this.isValidStepOne()) {
                                      this.setState({ currentStep: 2 });
                                    } else if (this.state.currentStep === 2) {
                                      this.setState({ currentStep: 1 });
                                    }
                                  }}
                                  class="btn btn-primary d-block w-100 mt-3"
                                  type="button"
                                  disabled={(this.state.currentStep === 1 ? !this.isValidStepOne() : false) || this.state.loading}
                                >
                                  {this.state.currentStep === 1
                                    ? "Next"
                                    : "Previous"}
                                </button>
                              </div>
                              <div class="mb-3">
                                <button
                                  class="btn btn-primary d-block w-100 mt-3"
                                  type="submit"
                                  name="submit"
                                  disabled={this.state.loading}
                                >
                                  {this.state.loading ? 'Signing up...' : 'Register'}
                                </button>
                              </div>
                            </>
                          )}

                          <CheckButton
                            style={{
                              display: "none",
                            }}
                            ref={(c) => {
                              this.checkBtn = c;
                            }}
                          />
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
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
  }
}

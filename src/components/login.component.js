/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import axios from 'axios'
import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this
            .handleLogin
            .bind(this);
        this.onChangeEmail = this
            .onChangeEmail
            .bind(this);
        this.onChangePassword = this
            .onChangePassword
            .bind(this);
        this.getIpAddress = this
            .getIpAddress
            .bind(this);

        this.getIpAddress()

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: "",
            ipAddress: ""
        };
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    componentWillMount() {
        const currentUser = AuthService.getCurrentUser();
        // if (currentUser)
            // this.setState({ redirect: "/" });
    }

    async getIpAddress() {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4, " IP ADDRESS");
        this.setState({ ipAddress: res.data.IPv4 });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({ message: "", loading: true });

        this
            .form
            .validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService
                .login(this.state.email, this.state.password, this.state.ipAddress)
                .then(response => {
                    console.log("==== RESPONSE ====");
                    console.log(response);
                    if(response?.accessToken == null) {

                        this.setState({ loading: false, message: 'Invalid email or password' });

                    }

                    if (response?.expired) {
                        alert(response.message)
                        this
                            .props
                            .history
                            .push("/signup");
                    }
                    else if (response?.currentUser) {

                        this.setState({ loading: false, message: null});


                        this
                            .props
                            .history
                            .push("/");
                        window
                            .location
                            .reload();
                    } else {

                        this.setState({ loading: false, message: 'Invalid email or password' });

                    }

                }, error => {
                    console.log("=== INVALID LOGIN ===");
                    console.log(error)
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    this.setState({ loading: false, message: resMessage });
                });
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        // if (this.state.redirect) {
        //     this
        //         .props
        //         .history
        //         .push(this.state.redirect);
        //     window
        //         .location
        //         .reload();
        // }
        return (
            <main class="main" id="top">
                <div class="container-fluid">
                    <div class="row min-vh-100 flex-center g-0">
                        <div class="col-lg-8 col-xxl-5 py-3 position-relative"><img
                            class="bg-auth-circle-shape"
                            src="/assets/img/icons/spot-illustrations/bg-shape.png"
                            alt=""
                            width="250" /><img
                                class="bg-auth-circle-shape-2"
                                src="/assets/img/icons/spot-illustrations/shape-1.png"
                                alt=""
                                width="150" />
                            <div class="card overflow-hidden z-index-1">
                                <div class="card-body p-0">
                                    <div class="row g-0 h-100">
                                        <div class="col-md-5 text-center bg-card-gradient">
                                            <div class="position-relative p-4 pt-md-5 pb-md-7 light">
                                                <div class="bg-holder bg-auth-card-shape"></div>

                                                <div class="z-index-1 position-relative">
                                                    <a
                                                        class="link-light mb-4 font-sans-serif fs-4 d-inline-block fw-bolder"
                                                        href="/">PlaylistGOATS</a>
                                                    <p class="opacity-75 text-white">Welcome Back PlaylistGOAT!<br /><br /> New Playlists Added Daily <br /><br /><br /> <img

                                                        src="/assets/img/logo.png"
                                                        alt=""
                                                        width="90" /></p>
                                                </div>
                                            </div>
                                            <div class="mt-3 mb-4 mt-md-4 mb-md-5 light">
                                                <p class="text-white">Don't have an account?<br />
                                                    <a class="text-decoration-underline link-light" href="/signup">Get started!</a>
                                                </p>
                                                <p class="mb-0 mt-4 mt-md-5 fs--1 fw-semi-bold text-white opacity-75">Read our
                                                    <a href=""> terms </a>and <a href="">privacy policy</a>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-7 d-flex flex-center">
                                            <div class="p-4 p-md-5 flex-grow-1">
                                                <div class="row flex-between-center">
                                                    <div class="col-auto">
                                                        <h3>Account Login</h3>
                                                    </div>
                                                </div>
                                                {this.state.message && (
                                                    <>

                                                    <div class="alert alert-danger">
                                                      <strong>Error!</strong> Invalid email or password.
                                                    </div>

                                                    </>
                                                )}
                                                <Form
                                                    onSubmit={this.handleLogin}
                                                    ref={c => {
                                                        this.form = c;
                                                    }}>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="card-email">Email address</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="email"
                                                            placeholder="Enter email address"
                                                            value={this.state.email}
                                                            onChange={this.onChangeEmail}
                                                            validations={[required, email]} />
                                                    </div>
                                                    <div class="mb-3">
                                                        <div class="d-flex justify-content-between">
                                                            <label class="form-label" for="card-password">Password</label>
                                                            <a class="fs--1" href="#" onClick={() => {
                                                                this
                                                                    .props
                                                                    .history
                                                                    .push("/forgotpassword");
                                                            }}>Forgot Password?</a>
                                                        </div>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Enter password"
                                                            name="password"
                                                            value={this.state.password}
                                                            onChange={this.onChangePassword}
                                                            validations={[required, vpassword]} />
                                                    </div>
                                                    <div class="form-check mb-0">
                                                        <input
                                                            class="form-check-input"
                                                            type="checkbox"
                                                            id="card-checkbox"
                                                            checked="checked" />
                                                        <label class="form-check-label" for="card-checkbox">Remember me</label>
                                                    </div>
                                                    <div class="mb-3">
                                                        <button disabled={this.state.loading} class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">
                                                            
                                                            {this.state.loading ? (
                                                               <>
                                                                   <div class="spinner-border" role="status">
                                                                     <span class="sr-only">Loading...</span>
                                                                   </div>
                                                               </>

                                                            ): 'Log In'}
                                                        
                                                        </button>
                                                        
                                                    </div>
                                                    <CheckButton
                                                        style={{
                                                            display: "none"
                                                        }}
                                                        ref={c => {
                                                            this.checkBtn = c;
                                                        }} />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
};
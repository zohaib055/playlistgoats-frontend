import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

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


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this
            .handleLogin
            .bind(this);
        this.onChangeEmail = this
            .onChangeEmail
            .bind(this);

        this.state = {
            email: "",
            loading: false,
            message: ""
        };
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    componentWillMount() {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser)
            this.setState({ redirect: "/" });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({ message: "", loading: true });

        this
            .form
            .validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService
                .forgotPassword(this.state.email)
                .then(response => {
                    alert("Please check your email")
                }, error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    this.setState({ loading: false, message: resMessage });
                });
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        if (this.state.redirect) {
            this
                .props
                .history
                .push(this.state.redirect);
            window
                .location
                .reload();
        }
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
                                                        <h3>Forgot Password</h3>
                                                    </div>
                                                </div>
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
                                                        <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Submit</button>
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
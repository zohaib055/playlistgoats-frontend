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


const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleResetPassword = this
            .handleResetPassword
            .bind(this);
        this.onChangeConfrimPassword = this
            .onChangeConfrimPassword
            .bind(this);
        this.onChangePassword = this
            .onChangePassword
            .bind(this);

        this.state = {
            password: "",
            confirmPassword: "",
            loading: false,
            message: "",
            email: "",
            fpCode: ""
        };
    }

    onChangeConfrimPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let email = query.get('email');
        let fpCode = query.get('fpCode');
        this.setState({
            ...this.state,
            email,
            fpCode
        })
    }

    componentWillMount() {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser)
            this.setState({ redirect: "/" });
    }

    handleResetPassword(e) {
        e.preventDefault();
        this.setState({ message: "", loading: true });

        if(this.state.password !== this.state.confirmPassword) {
            alert("Password didn't match")
            return;
        }
        this
            .form
            .validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService
                .resetPassword(this.state.email,this.state.fpCode, this.state.password)
                .then(response => {
                    this
                    .props
                    .history
                    .push("/login");

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
                                                        <h3>Reset Password</h3>
                                                    </div>
                                                </div>
                                                <Form
                                                    onSubmit={this.handleResetPassword}
                                                    ref={c => {
                                                        this.form = c;
                                                    }}>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="card-email">Password</label>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Enter password"
                                                            name="password"
                                                            value={this.state.password}
                                                            onChange={this.onChangePassword}
                                                            validations={[required, vpassword]} />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="card-email">Confirm Password</label>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            name="confirmPassword"
                                                            placeholder="Confirm Password"
                                                            value={this.state.confirmPassword}
                                                            onChange={this.onChangeConfrimPassword}
                                                            validations={[required, vpassword]} />
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
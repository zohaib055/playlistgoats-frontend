import React, { Component } from "react";
import AdminService from "../../services/admin.service";
import Input from "react-validation/build/input";
import authService from "../../services/auth.service";
import adminService from "../../services/admin.service";

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
export default class UserTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            password: ''
        };
        this.onChangePassword = this
            .onChangePassword
            .bind(this);

        this.handleResetPassword = this
            .handleResetPassword
            .bind(this);

        this.generateReferal = this
            .generateReferal
            .bind(this);

    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    generateReferal = () => {
        adminService.generateReferralCode(this.props.data.id).then((res) => {
            window.location.reload()
        })
    }

    handleResetPassword() {
        let email = this.props.data.email;
        let password = this.state.password;
        if (email.length && password.length >= 6 && password.length <= 14) {
            console.log("Worked!!", email, password, "LOG!")
            authService.adminResetPassword(email, password).then((res) => {
                console.log(res)
                this.setState({
                    ...this.state,
                    password: ''
                })
                alert("password reset successfully")
            })
        } else {
            console.log("in else")
            alert("please enter password with in 6 to 14 characters")
        }
    }

    render() {
        let loginLogs = this.props?.data?.loginLog
        let totalPoints = this.props?.data?.referral?.totalPoints
        let roleId = this.props?.data?.ac?.role?.id
        if (typeof loginLogs === 'string') {
            loginLogs = JSON.parse(loginLogs)
        }

        return (
            <div class="card mb-3" >
                <div class="card-header" style={{ cursor: 'pointer' }} onClick={() => {
                    this.setState({
                        showDetails: !this.state.showDetails
                    })
                }}>
                    <h5 class="mb-0">{this.props?.data?.email}</h5>
                </div>
                <div class="card-body border-top p-0">
                    {
                        this.state.showDetails ?
                            <>

                                <div class="row g-0 align-items-center border-bottom py-2 px-3" style={{ gap: 20 }}>
                                    <div class="col-md-auto">
                                        <label class="form-label" for="validationCustom01">Reset Password</label>
                                    </div>
                                    <div class="col-md-auto">
                                        <input placeholder="Enter new password" class="form-control" id="validationCustom01" onChange={this.onChangePassword} type="password" value={this.state.password} required="" />
                                    </div>
                                    <div class="col-md-auto">
                                        <button onClick={this.handleResetPassword} class="btn btn-primary" type="submit">Reset Password</button>
                                    </div>
                                </div>
                                {
                                    totalPoints !== undefined  ?
                                        <div class="row g-0 align-items-center border-bottom py-2 px-3" style={{ gap: 20 }}>
                                            <div class="col-md-auto">
                                                <label class="form-label" for="validationCustom01">Total Referals Points Earned : {totalPoints}</label>
                                            </div>
                                        </div> :
                                        <div class="row g-0 align-items-center border-bottom py-2 px-3" style={{ gap: 20 }}>
                                            <div class="col-md-auto">
                                                <label class="form-label" for="validationCustom01">Referal Code Not Generated For User</label>
                                            </div>
                                            {
                                                roleId === 1 ?
                                            <div class="col-md-auto">
                                                <button onClick={this.generateReferal} class="btn btn-primary" type="submit">Generate Code</button>
                                            </div> : <></>
                                            }
                                        </div>
                                }

                                {Array.isArray(loginLogs) && loginLogs?.map((l, index) => {
                                    return (<div class="row g-0 align-items-center border-bottom py-2 px-3">
                                        <div class="col-md-auto">
                                            <span class="badge badge-soft-success rounded-pill">{l.type}</span>
                                        </div>
                                        <div class="col-md-auto">
                                            <span class="">{l.timestamp}</span>
                                        </div>
                                    </div>)
                                })}
                            </> : <></>
                    }
                </div>
            </div>

        )
    }
};
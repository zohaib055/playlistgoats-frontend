import React, {Component} from "react";
import AdminService from "../../services/admin.service";

export default class BanIpRow extends Component {
    constructor(props) {
        super(props);
        this.deleteBanIp = this
        .deleteBanIp
        .bind(this);
        this.state = {};
    }

    deleteBanIp(banIpId){
        AdminService
        .unBanIp(banIpId)
        .then(response => {
            window.location.reload();
        }, error => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            this.setState({loading: false, message: resMessage});
        });
    }

    render() {
        return (
            <div class="row g-0 align-items-center border-bottom py-2 px-3">
                <div class="col-md-auto pe-3">
                    <span class="badge badge-soft-success rounded-pill">BAN</span>
                </div>
                <div class="col-md mt-1 mt-md-0">
                    <code>{this.props.data.ip}</code>
                </div>
                <div class="col-md mt-1 mt-md-0">
                    <code>Failed Attempts : {this.props.data.count}</code>
                </div>
                <div class="col-md-auto">
                <button onClick={() => this.deleteBanIp(this.props.data.id)} class="badge bg-danger">UNBAN</button>
                </div>
            </div>
        )
    }
};
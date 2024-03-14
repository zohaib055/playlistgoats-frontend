import React, {Component} from "react";
import AdminService from "../../services/admin.service";

export default class PromoRow extends Component {
    constructor(props) {
        super(props);
        
        this.deletePromo = this
        .deletePromo
        .bind(this);
        this.state = {};
    }

    deletePromo(playlistId){
        AdminService
        .deletePromo(playlistId)
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
                    <span class="badge badge-soft-success rounded-pill">200</span>
                </div>
                <div class="col-md mt-1 mt-md-0">
                    <code>{this.props.data.playlistId}</code>
                </div>
                <div class="col-md-auto">
                <button onClick={() => this.deletePromo(this.props.data.playlistId)} class="badge bg-danger">Remove</button>
                </div>
            </div>
        )
    }
};
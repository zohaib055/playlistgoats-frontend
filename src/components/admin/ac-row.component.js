import React, {Component} from "react";
import AdminService from "../../services/admin.service";

export default class AcRow extends Component {
    constructor(props) {
        super(props);
        this.deleteAc = this
        .deleteAc
        .bind(this);
        this.state = {};
    }

    deleteAc(ac){
        AdminService
        .deleteAc(ac)
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
                    <code>{this.props.data.code}</code>
                </div>
                <div class="col-md-5">
                {this.props.data.genres.map((g,i) => <p class="mb-0">{g.title}</p> )}
                </div>
                <div class="col-md-1">
                    <p class="mb-0">Used: {this.props.data.used}</p>
                </div>
                <div class="col-md-auto">
                <button onClick={() => this.deleteAc(this.props.data.code)} class="badge bg-danger">Remove</button>
                </div>
            </div>
        )
    }
};
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from "react";

export default class ArtistRow extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <a  
                onClick={() => this.props.onChangeArtistScelto(this.props.data)}
                class="dropdown-item artist px-card py-2"
                >
                <div class="d-flex align-items-center">
                    <div class="file-thumbnail me-2"><img
                        class="border h-100 w-100 fit-cover rounded-3"
                        src={this.props.data.image_url}
                        alt=""/></div>
                    <div class="flex-1">
                        <h6 class="mb-0 title">{this.props.data.artist_name}</h6>
                        <p class="fs--2 mb-0 d-flex">
                            <span class="fw-semi-bold">Spotify</span>
                            <span class="fw-medium text-600 ms-2">{this.props.data.followers + " Followers"}</span>
                            {/* <span class="fw-medium text-600 ms-2">{popularity + " Popularity"}</span> */}
                        </p>
                    </div>
                </div>
            </a>
        )
    }
};
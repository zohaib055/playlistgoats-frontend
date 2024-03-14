/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import Footer from "../footer.component";
import Nav from "../nav.component";
import TopBanner from "../top-banner.component";
import Search from "../search/search.component";
import Chat from "../chat/chat.component";
import UserService from "../../services/user.service";
import StatService from "../../services/stats.service";
import AuthService from "../../services/auth.service";
import ArtistModal from '../artist_modal/artist-modal.component'
import Admin from "../admin/admin.component";
import $ from 'jquery';

let timeOut = null;

export default class ArtistList extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            component: "search",
            searchKey: "",
            playlistData: [],
            loading: true,
            deleteLoading: false
        };

    }
    getSavedPlaylist() {
        UserService.getSavedPlaylist().then((response) => {
            this.setState({
                playlistData: response.playlists,
                loading: false,
                deleteLoading: false
            })
        })
    }
    componentDidMount() {
        this.getSavedPlaylist()
    }

    handleSearch(e) {
        this.setState({
            searchKey: e.target.value
        })

    }



    deletePlaylist(playlistId) {
        this.setState({
            ...this.state,
            deleteLoading: true
        })
        UserService.deleteSavedPlaylist(playlistId).then((response) => {
            this.getSavedPlaylist();
        })
    }

    componentWillMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            this.setState({ redirect: "/login" });
        }
        else {
            let accountRole = AuthService.getCurrentUser().currentUser?.ac?.roleId || 1
            this.setState({ currentUser: currentUser, userReady: true, component: accountRole === 1 ? "search" : "chat" })
        }
    }

    render() {
        console.log(this.state.playlistData, "LOGME")

        let loading = this.state.loading
        if (this.state.redirect) {
            this
                .props
                .history
                .push(this.state.redirect);
            window
                .location
                .reload();
        }

        let playlistData = this.state?.playlistData
        return (
            // <main class="main" id="top">
            //     <div class="container" data-layout="container">
            //         <div class="content">
            //             <TopBanner />
            <>
                <div class="row mb-3">
                    <div class="col">
                        <div class="card bg-100 shadow-none border">
                            <div class="row gx-0 flex-between-center">
                                <div class="col-sm-auto d-flex align-items-center"><img
                                    class="ms-n2"
                                    src="/assets/img/illustrations/crm-bar-chart.png"
                                    alt=""
                                    width="90" />
                                    <div>
                                        <h6 class="text-primary fs--1 mb-0">Welcome to the</h6>
                                        <h4 class="text-primary fw-bold mb-0">Playlist SEARCH ENGINE &nbsp;
                                            <span class="text-info fw-medium">for Spotify Users</span>
                                        </h4>
                                    </div><img
                                        class="ms-n4 d-md-none d-lg-block"
                                        src="/assets/img/illustrations/crm-line-chart.png"
                                        alt=""
                                        width="150" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <div class="card mb-3">
                            <div class="card-header border-bottom">
                                <div class="row flex-between-end">
                                    <div class="col-auto flex-lg-grow-1 flex-lg-basis-0 align-self-center">
                                        <div class="row">
                                            <div class="col-lg-4 border-lg-end border-bottom border-lg-0 pb-3 pb-lg-0">
                                                <div class="d-flex flex-between-center">
                                                    <div class="search-box">
                                                        <input
                                                            onChange={(e) => this.handleSearch(e)}
                                                            value={this.state.searchKey}
                                                            class="form-control search-input fuzzy-search"
                                                            type="search"
                                                            placeholder="Keywords..."
                                                            aria-label="Search" />
                                                        <span class="fas fa-search search-box-icon"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="search-overlay" class="card-body pt-0">
                                <div class="tab-content">
                                    <div
                                        class="tab-pane preview-tab-pane active"
                                        role="tabpanel"
                                        aria-labelledby="tab-dom-9e80409e-49e0-4986-9fcb-16b9838d0cff"
                                        id="dom-9e80409e-49e0-4986-9fcb-16b9838d0cff">
                                        <div class="table-responsive scrollbar">
                                            <table id="table1" class="table table-hover table-striped overflow-hidden">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Playlist Name</th>
                                                        <th scope="col">Songs</th>
                                                        <th scope="col">Follower</th>
                                                        <th scope="col">Email</th>
                                                        <th class="text-end" scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tbody1">
                                                    {
                                                        !loading ? playlistData.filter((eachPlaylist) => {
                                                            const playlistMetadata = eachPlaylist?.metadata;
                                                            return playlistMetadata?.playlist_name?.toLowerCase().includes(this.state.searchKey?.toLowerCase());
                                                        }).map((eachPlaylist) => {
                                                            const playlistMetadata = eachPlaylist?.metadata;

                                                            return (
                                                                <tr class="align-middle" >
                                                                    <td class="col-md-3 text-truncate">
                                                                        <div class="d-flex align-items-center">
                                                                            <div class="avatar avatar-xl">
                                                                                <img class="rounded-circle" src={playlistMetadata?.image_url} alt="" />
                                                                            </div>
                                                                            <div class="ms-2">
                                                                                <p

                                                                                    target="_blank">{playlistMetadata?.playlist_name}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="col-md-3">{playlistMetadata?.playlist_number_of_songs || "N/A"}</td>
                                                                    <td class="col-md-3">{playlistMetadata?.playlist_followers || "N/A"}</td>
                                                                    <td class="col-md-3">{playlistMetadata?.playlist_reference?.length ? playlistMetadata?.playlist_reference[0] : "N/A"}</td>

                                                                    <td class="col-md-3 text-truncate">
                                                                        <button
                                                                            onClick={() => this.deletePlaylist(playlistMetadata.playlist_id)}
                                                                            data-id={playlistMetadata.playlist_id}
                                                                            class="not_requested btn rounded-pill d-block badge-soft-warning"
                                                                            type="button"
                                                                            disabled={this.state.deleteLoading}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </td>

                                                                </tr>
                                                            )
                                                        }) :
                                                            <p></p>
                                                    }


                                                </tbody>
                                            </table>
                                            {
                                                loading &&
                                                <p style={{ textAlign: 'center' }}>Loading....</p>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />

            </>
            //         </div>
            //     </div>
            // </main>
        )
    }
};
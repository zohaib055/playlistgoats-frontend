/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";

export default class WelcomeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }



    render() {
        return (
            <div
                class="modal fade"
                id="welcome-link"
                data-bs-keyboard="false"
                data-bs-backdrop="static"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg mt-6" role="document">
                    <div class="modal-content border-0">
                        <div class="position-absolute top-0 end-0 mt-3 me-3 z-index-1">
                            <button
                                class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="bg-light rounded-top-lg py-3 ps-4 pe-6">
                                <h4 class="mb-1" id="staticBackdropLabel">Welcome To PlaylistGOATS 🐐</h4>
                                <p class="fs--2 mb-0">powerd by
                                    <a class="link-600 fw-semi-bold" href="#!">Spotify
                                    </a>
                                </p>
                            </div>
                            <div className="p-4">
                                <p class="text-word-break fs--1">Hey what’s going on! Here are some valuable tips to help you out.</p>
                                <h5 class="mb-3" id="staticBackdropLabel">1.  Connect your Spotify Artist Profile</h5>
                                <p class="text-word-break fs--1">Open the menu, connect your Spotify artist profile in a few clicks, search up your name & confirm! No passwords needed. </p>
                                <img src="/assets/img/guide/step-01.jpg" style={{ width: '100%', marginBottom: 20 }} />
                                <h5 class="mb-3" id="staticBackdropLabel">2.  Start Searching Playlists and Submit in a Single Click</h5>
                                <p class="text-word-break fs--1">You can start a search for your genre, go ahead & submit in a single click!  </p>
                                <img src="/assets/img/guide/step-02.jpg" style={{ width: '100%', marginBottom: 20 }} />
                                <h5 class="mb-3" id="staticBackdropLabel">3.  Chat Back and Forth with Each Playlist Curator </h5>
                                <p class="text-word-break fs--1">Access this in the menu, easy to use chat feature!</p>
                                <img src="/assets/img/guide/step-03.jpg" style={{ width: '100%', marginBottom: 20 }} />
                                <p class="text-word-break fs--1">Hope this helps,</p>
                                <p class="text-word-break fs--1">And of course, if you have any questions, just reach out! </p>
                                <div class="d-flex" style={{width : '100%',flex :1 ,display : 'flex' ,justifyContent : 'center',alignItems : 'center'}}>
                                    <button
                                        class="artist-scelto btn btn-success me-1 mb-1"
                                        data-bs-dismiss="modal"
                                        aria-label="Close">Continue to app
                                    </button>
                                </div>
                            </div>
                            {/* <div class="p-4">
                            <div class="row">
                                <div id="resoconto" class="col-lg-12">
                                    <div class="d-flex">
                                        <div class="flex-1">
                                            <h5 class="mb-2 fs-0">Insert Your Artist Name</h5>
                                            <div class="d-flex">
                                                <div class="search-box">
                                                    <input
                                                        onChange={this.onChangeKeys}
                                                        value={this.state.keys}
                                                        id="spotify-link-search"
                                                        class="form-control search-input fuzzy-search"
                                                        type="search"
                                                        placeholder="Search..."
                                                        aria-label="Search"/>
                                                    <span class="fas fa-search search-box-icon"></span>
                                                    <button
                                                        class="btn-close position-absolute end-0 top-50 translate-middle shadow-none p-1 me-1 fs--2"
                                                        type="button"
                                                        data-bs-dismiss="search"></button>
                                                    <div
                                                        id="spotify-link-results"
                                                        className={"dropdown-menu border font-base start-0 mt-2 py-0 overflow-hidden w-100 " + (this.state.artistScelto
                                                            ? ""
                                                            : "show")}>
                                                        <div
                                                            id="spotify-link-results-list"
                                                            class="scrollbar list py-3"
                                                            style={{
                                                            "max-height": "24rem"
                                                        }}>
                                                            {this.state.keys.length > 0 && <h6 class="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">Artists</h6>}
                                                            {this.state.artists && this
                                                                .state
                                                                .artists
                                                                .map((a) => {
                                                                    return <ArtistRow onChangeArtistScelto={this.onChangeArtistScelto} data={a}/>
                                                                })}
                                                        </div>
                                                        <div class="text-center mt-n3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr class="my-4"/>
                                        </div>
                                    </div>
                                    {this.state.artistScelto && <div>
                                        <div class="artist-scelto d-flex">
                                            <div class="file-thumbnail me-2"><img
                                                class="border h-100 w-100 fit-cover rounded-3"
                                                src={this.state.artistScelto.image_url}
                                                alt=""/></div>
                                            <div class="flex-1">
                                                <h5 class="mb-2 fs-0">Name: {this.state.artistScelto.artist_name}</h5>
                                                <p class="text-word-break fs--1">{this.state.artistScelto.followers} Followers</p>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <button
                                                onClick={this.setMyArtist}
                                                id="artist-confirm"
                                                class="artist-scelto btn btn-success me-1 mb-1"
                                                type="button">Confirm
                                            </button>
                                        </div>
                                    </div>
}
                                </div>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
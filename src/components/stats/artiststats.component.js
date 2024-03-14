/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import Footer from "../footer.component";
import Nav from "../nav.component";
import TopBanner from "../top-banner.component";
import Search from "../search/search.component";
import Chat from "../chat/chat.component";
import StatService from "../../services/stats.service";
import AuthService from "../../services/auth.service";
import ArtistModal from '../artist_modal/artist-modal.component'
import Admin from "../admin/admin.component";
import $ from 'jquery';

let timeOut = null;
const limit = 5;

export default class ArtistStats extends Component {
    constructor(props) {
        super(props);
        this.handlerNav = this.handlerNav.bind(this)
        this.preparePieChartData = this.preparePieChartData.bind(this)
        this.myRef = React.createRef();
        this.state = {
            component: "search",
            artistData: {},
            loading: true,
            artistFanData: {},
            artistPlayListData: [],
            page : 1

        };

    }

    getArtistPlaylist() {
        console.log("requesting!!")
        let artistId = this.props.match.params.id
        StatService.getArtistPlaylsit(artistId).then((response) => {
            console.log(response, "LOG !! playlistfata")
            this.setState({
                artistPlayListData: [...response.data.data,...response.data.data]
            })
        })

    }

    componentDidMount() {
        let artistId = this.props.match.params.id
        StatService.getArtist(undefined, artistId).then((response) => {
            this.setState({
                artistData: response.data.data[0],
                loading: false
            })
        })
        StatService.getArtistFans(artistId).then((response) => {
            this.setState({
                artistFanData: response.data.data,
                loading: false
            })
        })
        this.getArtistPlaylist()
    }


    handlerNav(c) {
        this.setState({
            component: c
        })
        $('#navbarVerticalCollapse').removeClass("show")
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
    preparePieChartData(artistFanData) {
        if (artistFanData.followers) {
            let followers = artistFanData['followers'][0]
            return {
                labels: ['Total', 'Weekly', 'Monthly'],
                datasets: [
                    {
                        label: 'Numebr of fans',
                        data: [followers.value || 0, followers.weekly_diff || 0, followers.monthly_diff || 0],
                        backgroundColor: [
                            'rgba(255, 99, 132)',
                            'rgba(54, 162, 235)',
                            'rgba(255, 206, 86)'
                        ],
                    },
                ],
                text: followers.value || 0 + followers.weekly_diff || 0 + followers.monthly_diff || 0
            }
        } else {
            return false
        }

    }

    render() {
        const artistData = this.state.artistData
        const artistPlayListData = this.state.artistPlayListData
        
        const genres = this.state?.artistData?.genres?.split(',') || []
        const artistFanData = this.preparePieChartData(this.state.artistFanData)
        console.log(artistPlayListData ,"Asdas")
        console.log(artistFanData, "artistFanData")
        console.log(artistData, "artistData")
        console.log(genres, "genres")

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
                <div class="container" data-layout="container">
                    <Nav handlerNav={this.handlerNav} />
                    <div class="content">
                        <TopBanner />
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
                                <div class="card bg-100 shadow-none border">
                                    <div class="row gx-0 flex-between-center" style={{ padding: 20 }}>
                                        <div class="d-flex align-items-center" >
                                            <div class="avatar avatar-xl">
                                                <img class="rounded-circle" src={artistData?.image_url} alt="" />
                                            </div>
                                            <div class="ms-2">
                                                <a
                                                    // href={"https://open.spotify.com/playlist/" + this.state.playlist_id}
                                                    target="_blank">{artistData?.name}</a>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center" style={{ gap: 10, marginTop: 20 }} >
                                            <h5 style={{ textAlign: 'center', marginBottom: 0 }}>Genres:</h5>
                                            {
                                                genres?.map((eachGeneres) => {
                                                    return (
                                                        <p style={{ textAlign: 'center', marginBottom: 0 }}>{eachGeneres}</p>
                                                    )

                                                })
                                            }
                                        </div>


                                    </div>

                                </div>
                                {
                                    artistData && Object.keys(artistData).length  ?
                                    <div className="analytics-container" style={{ marginTop: 20 }}>
                                    <div className="cardBox">
                                        <h5 class="mb-0 card-heading-text" data-anchor="data-anchor">Total Followers</h5>
                                        <h5 class="mb-0 card-count-text" data-anchor="data-anchor">{artistData?.sp_followers || 0}</h5>
                                    </div>
                                    <div className="cardBox">
                                        <h5 class="mb-0 card-heading-text" data-anchor="data-anchor">Monthly Listner</h5>
                                        <h5 class="mb-0 card-count-text" data-anchor="data-anchor">{artistData?.sp_monthly_listeners || 0}</h5>
                                    </div>
                                    <div className="cardBox">
                                        <h5 class="mb-0 card-heading-text" data-anchor="data-anchor">Popularity</h5>
                                        <h5 class="mb-0 card-count-text" data-anchor="data-anchor">{artistData?.sp_popularity || 0}</h5>
                                    </div>
                                    <div className="cardBox">
                                        <h5 class="mb-0 card-heading-text" data-anchor="data-anchor">Fan Conversion Rate</h5>
                                        <h5 class="mb-0 card-count-text" data-anchor="data-anchor">{ (artistData.sp_followers / artistData.sp_monthly_listeners * 100) ? `${(artistData.sp_followers / artistData.sp_monthly_listeners * 100).toFixed(2)}%` : '0%'}</h5>
                                    </div>

                                </div> : <></>
                                }

                                {
                                    artistPlayListData && artistPlayListData?.length ?
                                    <div id="search-overlay" class="card-body">
                                    <div class="tab-content">
                                        <div
                                            class="tab-pane preview-tab-pane active"
                                            role="tabpanel"
                                            aria-labelledby="tab-dom-9e80409e-49e0-4986-9fcb-16b9838d0cff"
                                            id="dom-9e80409e-49e0-4986-9fcb-16b9838d0cff">
                                            <div class="table-responsive scrollbar">
                                                <div class="card bg-100 shadow-none border" style={{ padding: 20,maxHeight: 400 }}>
                                                    <h5  data-anchor="data-anchor">Top Playlist</h5>
                                                    <hr />
                                                    <table id="table1" class="table table-hover table-striped overflow-hidden">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Playlist</th>
                                                                <th scope="col">Position</th>
                                                                <th scope="col">Added on</th>
                                                                <th scope="col">Likes</th>
                                                                <th class="text-end" scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="tbody1">
                                                            {
                                                                artistPlayListData?.slice(0,this.state.page*limit).map((eachRow) => {
                                                                    let eachData = eachRow['playlist']
                                                                    return (
                                                                        <tr class="align-middle" >
                                                                            <td class="col-md-6 text-truncate">
                                                                                <div class="d-flex align-items-center">
                                                                                    <div class="avatar avatar-xl">
                                                                                        <img class="rounded-circle" src={eachData?.playlist_image_url} alt="" />
                                                                                    </div>
                                                                                    <div class="ms-2">
                                                                                        <a
                                                                                            href={"https://open.spotify.com/playlist/" + this.state.playlist_id}
                                                                                            target="_blank">{eachData?.name}</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="col-md-3">{eachData?.position || "0"}</td>
                                                                            <td class="col-md-3">{eachData?.added_at || "0"}</td>
                                                                            <td class="col-md-3">{eachData?.likes || "0"}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }


                                                        </tbody>
                                                    </table>
                                                    {
                                                        artistPlayListData.slice(0,this.state.page*limit ).length % limit === 0 && artistPlayListData.length !== 0 ?
                                                            <div class="card-header">
                                                                <p class="mb-0" onClick={() => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        page: this.state.page + 1
                                                                    })
                                                                }} style={{
                                                                    textAlign: 'center',
                                                                    color: 'blue',
                                                                    textDecoration: 'underline',
                                                                    cursor: 'pointer'
                                                                }}>Load More</p>
                                                            </div> :
                                                            <></>
                                                    }
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div> :<></>
                                }
                            
                                
                                {
                                    artistFanData && artistPlayListData?.length &&
                                    <div class="row mb-3" style={{marginTop  :20}}>
                                        <div class="col">
                                            <div class="card bg-100 shadow-none border" style={{ width: '50%', padding: 20 }}>
                                                <h5 class="mb-0 " data-anchor="data-anchor">Total Fans</h5>
                                                <div class="row gx-0 flex-between-center" style={{ position: 'relative' }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }




                            </div>
                        </div>

                        <Footer />


                    </div>
                </div>
            </main>
        )
    }
};
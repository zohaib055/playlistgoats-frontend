import React, { Component } from "react";
import AdminService from "../../services/admin.service";
import PromoRow from "./promo-row.component";
import AcRow from "./ac-row.component";
import UserTracker from "./user-tracker.component";
import BanIpRow from "./ban-ip-row.component";

import "../../../src/App.css"
import adminService from "../../services/admin.service";

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.loadData = this
            .loadData
            .bind(this);

        this.createPromo = this
            .createPromo
            .bind(this);

        this.createAc = this
            .createAc
            .bind(this);

        this.handleGenre = this
            .handleGenre
            .bind(this);

        this.state = {
            checkedItems: new Map(),
            activationPage: 1,
            playlistPage: 1,
            banIpPage: 1,
            limit: 10,
        };
    }

    handleGenre(e) {
        var isChecked = e.target.checked;
        var item = e.target.value;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    updateEmail(type) {
        AdminService
            .updateEmail(type, (type == "firstEmail"
                ? this.state.firstEmailText
                : this.state.recurringEmailText))
            .then(response => {
                this.loadData()
                this.forceUpdate();
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({ loading: false, message: resMessage });
            });
    }

    createAc() {
        AdminService
            .createAc(this.state.ac, JSON.stringify(Object.fromEntries(this.state.checkedItems)))
            .then(response => {
                window
                    .location
                    .reload();
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({ loading: false, message: resMessage });
            });
    }

    createPromo() {
        AdminService
            .createPromo(this.state.playlistId)
            .then(response => {
                console.log("OKOKOKOKOKO")
                window
                    .location
                    .reload();
            }, error => {

                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({ loading: false, message: resMessage });
            });
    }

    loadData() {
        AdminService
            .getData()
            .then(response => {
                this.setState({ data: response.data });
                this.forceUpdate();
                console.log(this.state.data)
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({ loading: false, message: resMessage });
            });
        adminService.getAnalyticsData().then((response) => {
            this.setState({ analyticsData: response.data })
        }, error => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            this.setState({ loading: false, message: resMessage });
        })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        let activateCodeData = Array.isArray(this.state?.data?.all_Ac) ? this.state?.data?.all_Ac : [];
        let showActivationLoadMore = activateCodeData.length > (this.state.activationPage * this.state.limit) ? true : false
        activateCodeData = activateCodeData.slice(0, this.state.activationPage * this.state.limit)

        let playlistPromoData = Array.isArray(this.state?.data?.all_PlaylistInPromo) ? this.state?.data?.all_PlaylistInPromo : [];
        let showPlaylistPromoDataLoadMore = activateCodeData.length > (this.state.playlistPage * this.state.limit) ? true : false
        playlistPromoData = playlistPromoData.slice(0, this.state.playlistPage * this.state.limit)

        let banIpData = Array.isArray(this.state?.data?.all_Ips) ? this.state?.data?.all_Ips : [];
        let showBanIpLoadMore = banIpData.length > (this.state.banIpPage * this.state.limit) ? true : false
        banIpData = banIpData.slice(0, this.state.banIpPage * this.state.limit)

        const analyticsData = this.state.analyticsData;

        return (
            <div>
                {
                    analyticsData ?
                        <div className="analytics-container">
                            <div className="cardBox">
                                <h5 class="mb-0 card-heading-text" data-anchor="data-anchor">Total Artists</h5>
                                <h5 class="mb-0 card-count-text" data-anchor="data-anchor">{analyticsData?.totalArtist}</h5>
                            </div>
                            <div className="cardBox">
                                <h5 class="mb-0 card-heading-text" data-anchor="data-anchor">Total Curators</h5>
                                <h5 class="mb-0 card-count-text" data-anchor="data-anchor">{analyticsData?.totalCurators}</h5>
                            </div>
                            <div className="cardBox">
                                <h5 class="mb-0 card-heading-text" data-anchor="data-anchor">Artist Requested</h5>
                                <h5 class="mb-0 card-count-text" data-anchor="data-anchor">{analyticsData?.artistRequests}</h5>
                            </div>
                            <div className="cardBox">
                                <h5 class="mb-0 card-heading-text" data-anchor="data-anchor">Curator Responded</h5>
                                <h5 class="mb-0 card-count-text" data-anchor="data-anchor">{analyticsData?.curatorResponse}</h5>

                            </div>
                        </div> : <></>
                }
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="row flex-between-end">
                            <div class="col-auto flex-lg-grow-1 flex-lg-basis-0 align-self-center">
                                <h5 class="mb-0" data-anchor="data-anchor">Set First Email Text</h5>
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-light">
                        <div class="tab-content">
                            <div
                                class="tab-pane preview-tab-pane active"
                                role="tabpanel"
                                aria-labelledby="tab-dom-2d83fdae-5f97-4407-b2ad-3d41201fc276"
                                id="dom-2d83fdae-5f97-4407-b2ad-3d41201fc276">
                                <div class="mb-3">
                                    <p class="form-label" for="exampleFormControlTextarea1">Current: {this.state.data && this.state.data.all_EmailTemplate && this.state.data.all_EmailTemplate[0].firstEmail}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="exampleFormControlTextarea1">Textarea</label>
                                    <textarea
                                        onChange={(e) => this.setState({ firstEmailText: e.target.value })}
                                        class="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"></textarea>
                                </div>
                            </div>
                            <div
                                class="tab-pane code-tab-pane"
                                role="tabpanel"
                                aria-labelledby="tab-dom-f28d88e3-2f40-4261-a3c7-61f088f912ab"
                                id="dom-f28d88e3-2f40-4261-a3c7-61f088f912ab">
                                <pre class="scrollbar rounded-1" style={{ "max-height": "420px" }}><code class="language-html"></code></pre>
                            </div>
                        </div>
                        <button onClick={() => this.updateEmail("firstEmail")} class="btn btn-primary" type="submit">Update</button>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="row flex-between-end">
                            <div class="col-auto flex-lg-grow-1 flex-lg-basis-0 align-self-center">
                                <h5 class="mb-0" data-anchor="data-anchor">Set Recurring Email Text</h5>
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-light">
                        <div class="tab-content">
                            <div
                                class="tab-pane preview-tab-pane active"
                                role="tabpanel"
                                aria-labelledby="tab-dom-2d83fdae-5f97-4407-b2ad-3d41201fc276"
                                id="dom-2d83fdae-5f97-4407-b2ad-3d41201fc276">
                                <div class="mb-3">                                <p class="form-label" for="exampleFormControlTextarea1">Current: {this.state.data && this.state.data.all_EmailTemplate && this.state.data.all_EmailTemplate[0].recurringEmail}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="exampleFormControlTextarea1">Textarea</label>
                                    <textarea onChange={(e) => this.setState({ recurringEmailText: e.target.value })} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div>
                            <div
                                class="tab-pane code-tab-pane"
                                role="tabpanel"
                                aria-labelledby="tab-dom-f28d88e3-2f40-4261-a3c7-61f088f912ab"
                                id="dom-f28d88e3-2f40-4261-a3c7-61f088f912ab">
                                <pre class="scrollbar rounded-1" style={{ "max-height": "420px" }}><code class="language-html"></code></pre>
                            </div>
                        </div>
                        <button onClick={() => this.updateEmail("recurringEmail")} class="btn btn-primary" type="submit">Update</button>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="row flex-between-end">
                            <div class="col-auto flex-lg-grow-1 flex-lg-basis-0 align-self-center">
                                <h5 class="mb-0" data-anchor="data-anchor">Add New Activation Code</h5>
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-light">
                        <div class="tab-content">
                            <div class="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-d457c23e-a191-423c-aef1-4740c0ebfe3b" id="dom-d457c23e-a191-423c-aef1-4740c0ebfe3b">
                                <div class="col-md-4">
                                    <label class="form-label" for="validationCustom01">Code</label>
                                    <input onChange={(e) => this.setState({ ac: e.target.value })} class="form-control" id="validationCustom01" type="text" value={this.state.ac} required="" />
                                </div>
                                <div class="col-md-12">
                                    <label for="organizerMultiple">Genres</label>
                                    {this.state.data && this.state.data.all_Genre.map((g, index) => (<div><input onChange={this.handleGenre} class="form-check-input" type="checkbox" value={g.title} />
                                        <label class="form-check-label" for="flexCheckChecked">{g.title}</label></div>))}
                                </div>
                                <div class="col-12">
                                    <button onClick={this.createAc} class="btn btn-primary" type="submit">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="row flex-between-end">
                            <div class="col-auto flex-lg-grow-1 flex-lg-basis-0 align-self-center">
                                <h5 class="mb-0" data-anchor="data-anchor">Insert New Playlist promo</h5>
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-light">
                        <div class="tab-content">
                            <div class="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-d457c23e-a191-423c-aef1-4740c0ebfe3b" id="dom-d457c23e-a191-423c-aef1-4740c0ebfe3b">
                                <div class="col-md-4">
                                    <label class="form-label" for="validationCustom01">Playlist Id</label>
                                    <input placeholder="Example: xysnf67sv8s" class="form-control" id="validationCustom01" onChange={(e) => this.setState({ playlistId: e.target.value })} type="text" value={this.state.playlistId} required="" />
                                </div>
                                <div class="col-12">
                                    <button onClick={this.createPromo} class="btn btn-primary" type="submit">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <h5 class="mb-0">Playlist InPromo List</h5>
                    </div>
                    <div class="card-body border-top p-0">
                        {playlistPromoData?.map((p, index) => { return <PromoRow data={p} /> })}
                    </div>
                    {
                        showPlaylistPromoDataLoadMore &&
                        <div class="card-header">
                            <p class="mb-0" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    playlistPage: this.state.playlistPage + 1
                                })
                            }} style={{
                                textAlign: 'center',
                                color: 'blue',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>Load More</p>
                        </div>
                    }
                </div>

                <div class="card mb-3">
                    <div class="card-header">
                        <h5 class="mb-0">Ban Ip List</h5>
                    </div>
                    <div class="card-body border-top p-0">
                        {
                            banIpData.length ?
                                banIpData?.map((p, index) => { return <BanIpRow data={p} /> }) :
                                <p style={{ textAlign: 'center' }}>No Record Found!!</p>
                        }
                    </div>
                    {
                        showBanIpLoadMore &&
                        <div class="card-header">
                            <p class="mb-0" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    playlistPage: this.state.playlistPage + 1
                                })
                            }} style={{
                                textAlign: 'center',
                                color: 'blue',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>Load More</p>
                        </div>
                    }
                </div>

                <div class="card mb-3">
                    <div class="card-header">
                        <h5 class="mb-0">Activation Code List</h5>
                    </div>
                    <div class="card-body border-top p-0">
                        {activateCodeData?.map((ac, index) => { return <AcRow data={ac} /> })}
                    </div>
                    {
                        showActivationLoadMore &&
                        <div class="card-header">
                            <p class="mb-0" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    activationPage: this.state.activationPage + 1
                                })
                            }} style={{
                                textAlign: 'center',
                                color: 'blue',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>Load More</p>
                        </div>
                    }
                </div>

                {this.state.data && this.state.data.all_Users.map((u, index) => { return <UserTracker data={u} /> })}

            </div>
        )
    }
}
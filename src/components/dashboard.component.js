/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import Footer from "./footer.component";
import Nav from "./nav.component";
import TopBanner from "./top-banner.component";
import Search from "./search/search.component";
import Chat from "./chat/chat.component";
import AuthService from "../services/auth.service";
import ArtistModal from './artist_modal/artist-modal.component'
import Admin from "./admin/admin.component";
import $ from 'jquery';
import WelcomeModal from "./welcome_modal/welcome-modal.component";
import ArtistList from "./stats/artist.component";
import Analytics from "./analytics.component";
import { ToastContainer, toast } from 'react-toastify';
import Subscription from "./subscription/subscription.component";



export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.handlerNav = this.handlerNav.bind(this)
        this.myRef = React.createRef();
        this.state = {
            component: "search",
            artistModal: false,
            showWelcomeModal: true

        };

    }
    componentDidMount() {
        if ((this.myRef.current && localStorage.getItem("firstLogin")) === 'true') {
            this.myRef.current.click()
            setTimeout(()=>{
                localStorage.setItem("firstLogin", false)
            },2000)
        } 
    }

    handlerNav(c) {
        this.setState({
            component: c
        })
        $('#navbarVerticalCollapse').removeClass("show")
    }

    componentWillMount() {
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser)
        if (!currentUser) {
            this.setState({ redirect: "/login" });
        }
        else {
            let accountRole = AuthService.getCurrentUser().currentUser.ac.roleId
            this.setState({ currentUser: currentUser, userReady: true, component: accountRole === 1 ? "search" : "chat" })
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
        const showModal = true
        return (
            <main class="main" id="top">
                <div class="container" data-layout="container">
                    <Nav handlerNav={this.handlerNav} {...this.props} />
                    <div class="content">
                        <TopBanner isTrail={AuthService.getCurrentUser()?.currentUser?.isTestAccount} />
                        {this.state.component === "search" && AuthService.getCurrentUser().currentUser.ac.roleId === 1 ? <Search /> : undefined}
                        {this.state.component === "chat" && AuthService.getCurrentUser().currentUser.ac.roleId !== 3 ? <Chat /> : undefined}
                        {this.state.component === "playlistAnalytics" && AuthService.getCurrentUser().currentUser.ac.roleId !== 3 ? <Analytics {...this.props}  /> : undefined}
                        {this.state.component === "stats" && AuthService.getCurrentUser().currentUser.ac.roleId !== 3 ? <ArtistList {...this.props} /> : undefined}
                        {this.state.component === "subscriptionDetails" && AuthService.getCurrentUser().currentUser.ac.roleId !== 3 ? <Subscription {...this.props} /> : undefined}
                        
                        {AuthService.getCurrentUser().currentUser.ac.roleId === 3 ? <Admin /> : undefined}
                        <Footer />
                        <ArtistModal />
                        {showModal && <WelcomeModal />}

                        <a
                            class="nav-link"
                            data-bs-toggle="modal"
                            ref={this.myRef}
                            data-bs-target={AuthService.getCurrentUser().currentUser.ac.roleId == 1 ? "#welcome-link" : ""}
                            role="button"></a>
                    </div>
                </div>
                
            </main>
        )
    }
};
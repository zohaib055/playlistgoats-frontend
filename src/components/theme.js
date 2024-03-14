/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import Footer from "./footer.component";
import Nav from "./nav.component";
import TopBanner from "./top-banner.component";
import AuthService from "../services/auth.service";
import ArtistModal from "./artist_modal/artist-modal.component";
import Admin from "./admin/admin.component";
import $ from "jquery";
import WelcomeModal from "./welcome_modal/welcome-modal.component";

export default class Theme extends Component {
  constructor(props) {
    super(props);
    this.handlerNav = this.handlerNav.bind(this);
    this.myRef = React.createRef();
    this.state = {
      component: "search",
      artistModal: false,
      showWelcomeModal: true,
    };
  }
  componentDidMount() {
    if ((this.myRef.current && localStorage.getItem("firstLogin")) === "true") {
      this.myRef.current.click();
      setTimeout(() => {
        localStorage.setItem("firstLogin", false);
      }, 2000);
    }
  }

  handlerNav(c) {
    this.setState({
      component: c,
    });
    $("#navbarVerticalCollapse").removeClass("show");
  }

  componentWillMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
    if (!currentUser) {
        window.location.href = "/login"
    } else {
      let accountRole = AuthService.getCurrentUser()?.currentUser?.ac?.roleId;
      this.setState({
        currentUser: currentUser,
        userReady: true,
        component: accountRole === 1 ? "search" : "chat",
      });
    }
  }

  render() {
    
    const showModal = true;
    return (
      <main class="main" id="top">
        <div class="container" data-layout="container">
          <Nav handlerNav={this.handlerNav} {...this.props} />
          <div class="content">
            <TopBanner
              isTrail={AuthService?.getCurrentUser() && AuthService?.getCurrentUser()?.currentUser?.isTestAccount}
            />

            {this.props.children}

            {AuthService.getCurrentUser()?.currentUser?.ac?.roleId === 3 ? (
              <Admin />
            ) : undefined}
            <Footer />
            <ArtistModal />
            {showModal && <WelcomeModal />}

            <a
              class="nav-link"
              data-bs-toggle="modal"
              ref={this.myRef}
              data-bs-target={
                (AuthService?.getCurrentUser() && AuthService.getCurrentUser().currentUser.ac.roleId == 1)
                  ? "#welcome-link"
                  : ""
              }
              role="button"
            ></a>
          </div>
        </div>
      </main>
    );
  }
}

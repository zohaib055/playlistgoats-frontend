/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import MessageIn from "./messageIn.component";
import MessageOut from "./messageOut.component";
import AuthService from "../../services/auth.service";
import $ from "jquery";
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
    if (!currentUser) {
      this.setState({ redirect: "/login" });
    }
    this.setState({ currentUser: currentUser });
    setTimeout(function () {
      $(".card-chat-pane.active .chat-content-scroll-area").scrollTop(
        $(".card-chat-pane.active .chat-content-scroll-area").prop(
          "scrollHeight"
        )
      );
    }, 2500);
  }

  render() {
    return (
      <div
        className={
          "tab-pane card-chat-pane " +
          (this.props.active == this.props.index ? "active" : "")
        }
        id={"chat-" + this.props.index}
        role="tabpanel"
        aria-labelledby={"chat-link-" + this.props.index}
      >
        <div class="chat-content-header">
          <div class="row flex-between-center">
            <div class="col-6 col-sm-8 d-flex align-items-center">
              <a
                onClick={() => this.props.chatMove("close")}
                class="pe-3 text-700 d-md-none contacts-list-show"
              >
                <div class="fas fa-chevron-left"></div>
              </a>
              <div class="min-w-0">
                <h5 class="mb-0 text-truncate fs-0">
                  {this.props.activePlaylistInfo &&
                    this.props.activePlaylistInfo.playlist_name}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div
          class="chat-content-body"
          style={{
            display: "inherit",
          }}
        >
          <div class="chat-content-scroll-area scrollbar">
            <div class="d-flex position-relative p-3 border-bottom mb-3 align-items-center">
              <div class="avatar avatar-2xl me-3">
                <img
                  class="rounded-circle"
                  src={
                    this.props.activePlaylistInfo &&
                    this.props.activePlaylistInfo.image_url
                  }
                  alt=""
                />
              </div>
              <div class="flex-1">
                <h6 class="mb-0">
                  <a class="text-decoration-none stretched-link text-700">
                    Direct Messaging with{" "}
                    {this.state.email &&
                      this.state.email.substring(
                        0,
                        this.state.email.lastIndexOf("@")
                      )}
                  </a>
                </h6>
              </div>
            </div>
            {this.props.activePlaylistInfo &&
              this.props.chat &&
              this.props.chat?.msg?.map((m, index) => {
                if (
                  AuthService.getCurrentUser().currentUser.ac.roleId != 2 &&
                  !m.deleted_by_artist
                ) {
                  if (m.sender === "curators") {
                    return (
                      <MessageIn
                        image_url={this.props.activePlaylistInfo.image_url}
                        msg={m}
                      />
                    );
                  } else if (m.sender === "artist") {
                    return (
                      <MessageOut
                        image_url={this.props.activePlaylistInfo.image_url}
                        msg={m}
                      />
                    );
                  }
                }
                if (
                  AuthService.getCurrentUser().currentUser.ac.roleId == 2 &&
                  !m.deleted_by_curator
                ) {
                  if (m.sender === "curators") {
                    return (
                      <MessageOut
                        image_url={this.props.activePlaylistInfo.image_url}
                        msg={m}
                      />
                    );
                  } else if (m.sender === "artist") {
                    return (
                      <MessageIn
                        image_url={this.props.activePlaylistInfo.image_url}
                        msg={m}
                      />
                    );
                  }
                }
              })}
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import UserService from "../../services/user.service";
import PlaylistRow from "./playlist_row.component";
import ChatTab from "./chat_tab.component";
import AuthService from "../../services/auth.service";
import $ from "jquery";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleActive = this.handleActive.bind(this);
    this.onChangeMsg = this.onChangeMsg.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.loadChats = this.loadChats.bind(this);

    this.chatMove = this.chatMove.bind(this);
    this.state = { active: 0, chatLeft: { left: "0px" } };
    if (!this.interval) {
      this.interval = setInterval(this.loadChats, 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSend(e) {
    UserService.sendMsg(
      this.state.msg,
      this.state.chats[this.state.active].id,
      this.state.chats[this.state.active].playlistId
    ).then(
      (response) => {
        this.setState({ msg: "" });
        this.loadChats();
        setTimeout(function () {
          $(".card-chat-pane.active .chat-content-scroll-area").scrollTop(
            $(".card-chat-pane.active .chat-content-scroll-area").prop(
              "scrollHeight"
            )
          );
        }, 1500);
        // window.location.reload();
      },
      (error) => {
        const resMessage =
          (error?.response &&
            error.response?.data &&
            error.response?.data?.message) ||
          error?.message ||
          error.toString();
        this.setState({ loading: false, message: resMessage });
      }
    );
  }

  onChangeMsg(e) {
    this.setState({ msg: e.target.value });
  }

  chatMove(m) {
    if (m === "open") {
      this.setState({ chatLeft: { left: "-100%" } });
    } else {
      this.setState({ chatLeft: { left: "0px" } });
    }
  }
  handleActive(index, playlistInfo) {
    this.setState({ active: index });
    this.setState({ activePlaylistInfo: playlistInfo });
    this.chatMove("open");
    setTimeout(function () {
      $(".card-chat-pane.active .chat-content-scroll-area").scrollTop(
        $(".card-chat-pane.active .chat-content-scroll-area").prop(
          "scrollHeight"
        )
      );
    }, 1500);
  }

  loadChats() {
    UserService.getChats().then(
      (response) => {
        this.setState({ chats: response?.data?.chats });
        this.forceUpdate();
      },
      (error) => {
        const resMessage =
          (error?.response &&
            error?.response?.data &&
            error.response?.data.message) ||
          error?.message ||
          error.toString();
        this.setState({ loading: false, message: resMessage });
      }
    );
  }

  componentDidMount() {
    window.scrollbarInit();

    this.loadChats();
  }

  render() {
    return (
      <div class="card card-chat overflow-hidden">
        <div class="card-body d-flex p-0 h-100">
          <div class="chat-sidebar" style={this.state.chatLeft}>
            <div class="contacts-list scrollbar-overlay">
              <div
                class="nav nav-tabs border-0 flex-column"
                role="tablist"
                aria-orientation="vertical"
              >
                {this.state.chats &&
                  this.state.chats.map((c, index) => {
                    return (
                      <PlaylistRow
                        newMessage={
                          (c.newMessageForCurator &&
                            AuthService.getCurrentUser().currentUser.ac
                              .roleId == 2) ||
                          (c.newMessageForArtist &&
                            AuthService.getCurrentUser().currentUser.ac
                              .roleId == 1)
                            ? 1
                            : 0
                        }
                        active={this.state.active}
                        handleActive={this.handleActive}
                        index={index}
                        data={c}
                      />
                    );
                  })}
              </div>
            </div>
            <div class="contacts-search-wrapper"></div>
          </div>
          <div class="tab-content card-chat-content">
            {this.state.chats &&
              this.state.chats.map((c, index) => {
                return (
                  <ChatTab
                    chatMove={this.chatMove}
                    active={this.state.active}
                    activePlaylistInfo={this.state.activePlaylistInfo}
                    index={index}
                    data={c}
                    chat={this.state.chats[index]}
                  />
                );
              })}
            <div
              class="chat-editor-area"
              style={{
                position: "absolute",
                bottom: "0",
              }}
            >
              <input
                onChange={this.onChangeMsg}
                value={this.state.msg}
                class="emojiarea-editor outline-none scrollbar form-control"
                style={{
                  color: "white",
                  backgroundColor: "#121f2d",
                  border: 0,
                  outline: 0,
                }}
                placeholder="Message..."
              />
              <button onClick={this.handleSend} class="btn btn-sm btn-send">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

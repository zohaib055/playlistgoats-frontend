import React, {Component} from "react";
import UserService from "../../services/user.service";

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
        this.handleDeleteChat = this
        .handleDeleteChat
        .bind(this);
    }

    componentDidMount() {
        UserService
            .getPlaylistInfo(this.state.playlistId)
            .then(response => {
                console.log(response,this.state.playlistId)
                if(response?.playlistInfo) {
                   this.setState({playlistInfo: JSON.parse(response?.playlistInfo?.replace(/^\s+|\s+$/g, "").replace(/\\"/g, '"'))});
                }
                if (this.props.index === this.props.active){
                    this.props.handleActive(this.props.index,this.state.playlistInfo)
                }
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({loading: false, message: resMessage});
            });
    }

    handleDeleteChat() {
        UserService
        .deleteChat(this.state.id).then(response => {
            console.log(response , " delete api response")
        }, error => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            this.setState({loading: false, message: resMessage});
        });
    }
    render() {
        return (
            <div
                
                className={"hover-actions-trigger chat-contact nav-item "+ (this.props.active == this.props.index ? "active":"") + " " + (this.props.newMessage ? "unread-message":"")}
                onClick={()=> this.props.handleActive(this.props.index,this.state.playlistInfo)}
                role="tab"
                id={"chat-link-"+this.props.index}
                data-bs-toggle="tab"
                data-bs-target={"#chat-"+this.props.index}
                aria-controls={"chat-"+this.props.index}
                aria-selected="true">
                <div class="d-md-none d-lg-block">
                    <div class="dropdown dropdown-active-trigger dropdown-chat">
                        <button
                            class="hover-actions btn btn-link btn-sm text-400 dropdown-caret-none dropdown-toggle end-0 fs-0 mt-4 me-1 z-index-1 pb-2 mb-n2"
                            type="button"
                            data-boundary="viewport"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            <span class="fas fa-cog" data-fa-transform="shrink-3 down-4"></span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end border py-2 rounded-2">
                            <a class="dropdown-item text-danger" href="#!" onClick={this.handleDeleteChat}>Delete</a>
                        </div>
                    </div>
                </div>
                <div class="d-flex p-3">
                    <div class="avatar avatar-xl">
                        <img class="rounded-circle" src={this.state.playlistInfo && this.state.playlistInfo.image_url} alt=""/>

                    </div>
                    <div class="flex-1 chat-contact-body ms-2 d-md-none d-lg-block">
                        <div class="d-flex justify-content-between">
                            <h6 class="mb-0 chat-contact-title">{this.state.playlistInfo && this.state.playlistInfo.playlist_name}</h6>
                        </div>
                        <div class="min-w-0">
                            <div class="chat-contact-content pe-3">{this.props.newMessage ? "New message" :  ""}
                            </div> 
                            <div class="position-absolute bottom-0 end-0 hover-hide"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
import React, {Component} from "react";

export default class MessageIn extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div class="d-flex p-3">
                <div class="avatar avatar-l me-2">
                    <img
                        class="rounded-circle"
                        src={this.props.image_url}
                        alt=""/>

                </div>
                <div class="flex-1">
                    <div class="w-xxl-75">
                        <div class="hover-actions-trigger d-flex align-items-center">
                            <div style={{whiteSpace:"pre-line"}} class="chat-message bg-200 p-2 rounded-2">{this.props.msg?.msg?.match(/.{1,50}/g)?.join("\n")}</div>
                        </div>
                        <div class="text-400 fs--2">
                            <span>{this.props.msg.timestamp}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
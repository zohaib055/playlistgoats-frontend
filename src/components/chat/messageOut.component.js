import React, {Component} from "react";
import striptags from 'striptags';

export default class MessageOut extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.msg)
        this.state = {};
    }

    render() {
        return (
            <div class="d-flex p-3">
                <div class="flex-1 d-flex justify-content-end">
                    <div class="w-100 w-xxl-75">
                        <div class="hover-actions-trigger d-flex flex-end-center">
                            <div style={{whiteSpace:"pre-line"}} class="bg-primary text-white p-2 rounded-2 chat-message light">
                                <p class="mb-0">{striptags(this.props.msg?.msg?.match(/.{1,50}/g)?.join("\n")).split("P.S.")[0]}
                                </p>
                            </div>
                        </div>
                        <div class="text-400 fs--2 text-end">{this.props.msg.timestamp}<span class="fas fa-check ms-2 text-success"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
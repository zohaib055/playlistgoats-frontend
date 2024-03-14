import React, {Component} from "react";
import moment from 'moment'


export default class Footer extends Component {
    constructor(props) {
        super(props);

        const date = new Date();

        this.state = {
           day: moment.weekdays(date.getDay()),
           year: date.getFullYear()
        };
    }

    render() {
        return (
            <footer class="footer">
                <div class="row g-0 justify-content-between fs--1 mt-4 mb-3">
                    <div class="col-12 col-sm-auto text-center">
                        <p class="mb-0 text-600">Thank you for being a part of the PlaylistGOATS family! Enjoy the rest of your {this.state.day}
                            <span class="d-none d-sm-inline-block">&nbsp;|&nbsp;
                            </span><br class="d-sm-none"/>
                            2022-{this.state.year} &copy;
                        </p>
                    </div>
                </div>
            </footer>
        )
    }
};
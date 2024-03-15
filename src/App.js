import React, {Component} from "react";
import {Switch, Route, Link, Redirect} from "react-router-dom";

import './loader.js'
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Dashboard from "./components/dashboard.component";
import ForgotPassword from "./components/forgotpassword.component.js";
import ResetPassword from "./components/resetpassword.component.js";
import ArtistList from "./components/stats/artist.component.js";
import ArtistStats from "./components/stats/artiststats.component.js";
import TrailAccount from "./components/trailaccount.component.js";
import 'react-toastify/dist/ReactToastify.css';
import SearchPage from "./pages/search.js";
import SavedPlaylistsPage from "./pages/saved-playlists.js";
import ChatPage from "./pages/chat.js";
import AnalyticsPage from "./pages/playlist-analyzer.js";
import SubscriptionPage from "./pages/billing.js";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        };

    }

    componentDidMount() {
        //localStorage.clear();
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/trial-account" component={TrailAccount}/>
                    <Route exact path="/forgotpassword" component={ForgotPassword}/>
                    <Route exact path="/reset-password" component={ResetPassword}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/signup/:activation" component={Signup}/>
                    <Route exact path="/artist/stats/:id" component={ArtistStats}/>
                    <Route exact path="/" component={SearchPage}/>
                    <Route exact path="/dashboard" component={SearchPage}/>
                    <Route exact path="/search/curators" component={SearchPage}/>
                    <Route exact path="/saved/playlists" component={SavedPlaylistsPage}/>
                    <Route exact path="/chat" component={ChatPage}/>
                    <Route exact path="/playlist/analyzer" component={AnalyticsPage}/>
                    <Route exact path="/subscription" component={SubscriptionPage}/>
                    <Route exact path="/playlist/analyzer/:id" component={AnalyticsPage}/>
                    <Route exact path="/bot/checker" component={AnalyticsPage}/>





                </Switch>
            </div>
        );
    }
}

export default App;

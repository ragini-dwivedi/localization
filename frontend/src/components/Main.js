import React, {Component} from 'react';
import { Switch, Route, Redirect }  from 'react-router-dom';
import UserDashboard from './home/UserDashboard';
import AdminDashboard from './home/AdminDashboard';
import UserProfile from './profile/profile';
import LandingPage from './landingPage/LandingPage';
import Community from './community/Community';
import Badges from './badge/Badges';
import AddEvents from './activity/events';
import AddActivities from './activity/activities';
import AddStatistics from './activity/statistics';

import AddEventsAdmin from './Admin/addEvent'
import AddActivitiesAdmin from './Admin/addActivity'
import AddCommunityAdmin from './Admin/addCommunity'
import AddBadgesAdmin from './Admin/addBadges'
import AddChallenge from './challenge/AddChallenge';
import Polls from './notification/poll';

//Create a Main Component
const Main = () => {

    return(
        <div>
            <Switch>
                {/*Render Different Component based on Route*/}
                <Route path="/dashboard" render={() => {
                    if (localStorage.getItem('email')) {
                        return <UserDashboard/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                    }} >
                </Route>
                <Route path="/badges" render={() => {
                    if (localStorage.getItem('email')) {
                        return <Badges/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                    }} >
                </Route>
                <Route path="/profile" render={() => {
                    if (localStorage.getItem('email')) {
                        return <UserProfile />;
                    } else {
                        return <Redirect to="/" />;
                    }
                    }} >
                </Route>
                <Route path="/community" render={() => {
                    if (localStorage.getItem('email')) {
                        return <Community/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                    }} >
                </Route>
                <Route path="/addevents" render={() => {
                    if (localStorage.getItem('email')) {
                        return <AddEvents/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/addstatistics" render={() => {
                    if (localStorage.getItem('email')) {
                        return <AddStatistics/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/addactivities" render={() => {
                    if (localStorage.getItem('email')) {
                        return <AddActivities/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/addChallenge" render={() => {
                    if (localStorage.getItem('email')) {
                        return <AddChallenge />;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/polls" render={() => {
                    if (localStorage.getItem('email')) {
                        return <Polls />;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/adminDashboard" render={() => {
                    if (localStorage.getItem('email') && (localStorage.getItem('role') === "admin")) {
                        return <AdminDashboard/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/admin/AddActivities" render={() => {
                    if (localStorage.getItem('email') && (localStorage.getItem('role') === "admin")) {
                        return <AddActivitiesAdmin/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/admin/AddCommunities" render={() => {
                    if (localStorage.getItem('email') && (localStorage.getItem('role') === "admin")) {
                        return <AddCommunityAdmin/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/admin/AddBadges" render={() => {
                    if (localStorage.getItem('email') && (localStorage.getItem('role') === "admin")) {
                        return <AddBadgesAdmin/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/admin/AddEvents" render={() => {
                    if (localStorage.getItem('email') && (localStorage.getItem('role') === "admin")) {
                        return <AddEventsAdmin/>;
                    } else {
                        return <Redirect to="/" />;
                    }
                }} >
                </Route>
                <Route path="/">
                    <LandingPage/>
                </Route>
            </Switch>
        </div>
    )

}
//Export The Main Component
export default Main;
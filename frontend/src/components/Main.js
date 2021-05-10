import React, {Component} from 'react';
import { Switch, Route, Redirect }  from 'react-router-dom';
import UserDashboard from './home/UserDashboard';
import UserProfile from './profile/profile';
import LandingPage from './landingPage/LandingPage';
import Community from './community/Community';
import Badges from './badge/Badges';
import AddEvents from './activity/events';
import AddActivities from './activity/activities';
import AddStatistics from './activity/statistics';

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
                <Route path="/">
                    <LandingPage/>
                </Route>
            </Switch>
        </div>
    )

}
//Export The Main Component
export default Main;
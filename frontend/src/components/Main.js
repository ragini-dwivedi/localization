import React, {Component} from 'react';
import { Switch, Route, Redirect }  from 'react-router-dom';
import UserDashboard from './home/UserDashboard';
import UserProfile from './profile/profile';
import LandingPage from './landingPage/LandingPage';
import Community from './community/Community';
import Badges from './home/Badges';

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
                <Route path="/">
                    <LandingPage/>
                </Route>
            </Switch>
        </div>
    )

}
//Export The Main Component
export default Main;
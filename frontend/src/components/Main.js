import React, {Component} from 'react';
import { Switch, Route }  from 'react-router-dom';
import UserDashboard from './home/UserDashboard';
import UserProfile from './profile/profile';
import LandingPage from './landingPage/LandingPage';

//Create a Main Component
const Main = () => {

    return(
        <div>
            <Switch>
                {/*Render Different Component based on Route*/}
                <Route path="/dashboard">
                    <UserDashboard/>
                </Route>
                <Route path="/profile">
                    <UserProfile/>
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
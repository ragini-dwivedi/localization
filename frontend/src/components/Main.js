import React, {Component} from 'react';
import { Switch, Route }  from 'react-router-dom';
import UserDashboard from './home/UserDashboard';
import LandingPage from './landingPage/LandingPage';
import Badges from './home/Badges';

//Create a Main Component
const Main = () => {

    return(
        <div>
            <Switch>
                {/*Render Different Component based on Route*/}
                <Route path="/profile">
                    <UserDashboard/>
                </Route>
                <Route path="/badges">
                    <Badges />
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
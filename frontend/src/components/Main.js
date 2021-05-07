import React, {Component} from 'react';
import { Switch, Route }  from 'react-router-dom';
import UserDashboard from './home/UserDashboard';

//Create a Main Component
const Main = () => {

    return(
        <div>
            <Switch>
                {/*Render Different Component based on Route*/}
                <Route path="/profile">
                    <UserDashboard/>
                </Route>
            </Switch>
        </div>
    )

}
//Export The Main Component
export default Main;
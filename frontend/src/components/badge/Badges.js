//Export the App component so that it can be used in index.js
import NavBar from "../NavBar";
import React, { useEffect, useState } from "react";
import axios from 'axios';

import '../../App.css'
import './Badges.css';
import backendConfig from "../../backendConfig";

export default function Badges() {

    const [data_all, set_data_all] = useState([]);
    const [data_personal, set_data_personal] = useState([]);

    useEffect(async () => {
      try {
        let result = await axios.get(`${backendConfig}/badges/getBadges/${localStorage.getItem('email')}`);
        set_data_all(result.data.data_all);
        set_data_personal(result.data.data_personal);
      }catch (e) {
        console.log(e);
      }

    }, []);

    return (
        <div className='parent'>
          <NavBar />
          <div className="container">
            <div className='row'>
              <h3>{`Today's date is ${new Date().getUTCMonth()}/ ${new Date().getUTCDate()}/ ${new Date().getUTCFullYear()}`}</h3>
              <h3>Badges Earned by {localStorage.getItem('fullName')}</h3>

              <div className='badges-1 col-md-6'>
                <h3 children="row">All Badges</h3>
                {
                  data_all.map((item) => {
                    return (
                      <div className='item'>
                        <img src={item.image} height='150px' width='150px'></img>
                        <h5>Name: {item.name}</h5>
                        <h5>Badges: {item.badges}</h5>
                      </div>
                    )
                  })
                }
              </div>
              <div className='badges-2 col-md-6'>
                <h3>Badges Earned</h3>
                {
                  data_personal.map((item) => {
                    return (
                      <div className='item'>
                        <img src={item.image} height='150px' width='150px'></img>
                        <h5>Name: {item.name}</h5>
                        <h5>Badges: {item.badges}</h5>
                      </div>
                    )
                  })
                }
              </div>  
            </div>  
          </div>
        </div>
    )
}
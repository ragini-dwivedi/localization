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
          <br />
          <br />
          <div className="container segment" style={{ padding: '2%'}}>
            <div className='row'>
                <div>
                    <h4>{`Today's date is ${new Date().getUTCMonth()}/ ${new Date().getUTCDate()}/ ${new Date().getUTCFullYear()}`}</h4>
                    <h4>Badges Earned by {localStorage.getItem('fullName')}</h4>
                </div>
              <br />
              <br />
                <br />
                <br />
              <div className='badges-1 col-md-6'>
                <h3 children="row">All Badges</h3>
                  <br />
                  <br />
                  <br />
                  <br />
                  <div className="container">
                      <div className="row">
                        {
                          data_all.map((item) => {
                            return (
                                <div className="col-md-4">
                                    <div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <img src={item.image} height='80px' width='80px'></img>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h7>Name: {item.name}</h7>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h7>Score: {item.badges}</h7>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            )
                          })
                        }
                      </div>
                  </div>
              </div>
              <div className='badges-2 col-md-6'>
                <h3>Badges Earned</h3>
                  <br />
                  <br />
                  <br />
                  <div className="container">
                      <div className="row">
                        {
                          data_personal.map((item) => {
                            return (
                                <div className="col-md-4">
                                    <div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <img src={item.image} height='80px' width='80px'></img>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h7>Name: {item.name}</h7>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h7>Score: {item.badges}</h7>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            )
                          })
                        }
                      </div>
                  </div>
              </div>
            </div>  
          </div>
        </div>
    )
}
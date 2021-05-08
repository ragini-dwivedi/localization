//Export the App component so that it can be used in index.js
import {useTranslation} from "react-i18next";
import NavBar from "../NavBar";
import React from "react";
import {Button} from "react-bootstrap";
import '../../App.css'
import image from "../../image/user.png";
import { MDBDataTable } from 'mdbreact';
import './Badges.css';

export default function Badges() {

    let data_all = [
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/scout-bbe8e7776663bdac41bafd4adc52ef025d7dfb3c243e11e083be890ba014e536.png',
        name: 'SCOUT',
        badges: 0, 
      }, 
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/hiker-6b4645ea6a18c1a9ae19714d20da2c462b35b6a7c216de267a870c4e6e89f063.png',
        name: 'HIKER',
        badges: 1, 
      },
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/explorer-a72bea6d182c20d69295230a64af09198c2ba537f92f301944ca9fa9af131fb6.png',
        name: 'EXPLORER',
        badges: 5, 
      },
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/adventurer-b91c35b90c3ec784fa5eccb14a0b8ba774c063da63438a0841e2b0590c48b1d2.png',
        name: 'ADVENTURER',
        badges: 10, 
      },
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/mountaineer-0e3b10e3c988808618f51a1181ee558539fc013b799bd17f8ee2b3183a2506ac.png',
        name: 'MOUNTAINEER',
        badges: 25, 
      },
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/expeditioner-e030631c4a379e3cd6e7e87fb9075fba1d5f45d7af583df65b07ff22ab228f43.png',
        name: 'EXPEDITIONER',
        badges: 50, 
      },
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/ranger-5b03d3a1591cab5d7a56e6d711b7aaba37ec8b183715bb7f474e347973d2e1d6.png',
        name: 'RANGER',
        badges: 10, 
      }
    ]

    let data_personal = [
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/scout-bbe8e7776663bdac41bafd4adc52ef025d7dfb3c243e11e083be890ba014e536.png',
        name: 'SCOUT',
        badges: 0, 
      }, 
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/hiker-6b4645ea6a18c1a9ae19714d20da2c462b35b6a7c216de267a870c4e6e89f063.png',
        name: 'HIKER',
        badges: 1, 
      },
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/explorer-a72bea6d182c20d69295230a64af09198c2ba537f92f301944ca9fa9af131fb6.png',
        name: 'EXPLORER',
        badges: 5, 
      },
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/adventurer-b91c35b90c3ec784fa5eccb14a0b8ba774c063da63438a0841e2b0590c48b1d2.png',
        name: 'ADVENTURER',
        badges: 10, 
      },
      {
        image: 'https://trailhead.salesforce.com/assets/ranks/mountaineer-0e3b10e3c988808618f51a1181ee558539fc013b799bd17f8ee2b3183a2506ac.png',
        name: 'MOUNTAINEER',
        badges: 25, 
      }
    ]

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
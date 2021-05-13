//Export the App component so that it can be used in index.js
import React, { Component, useState } from "react";
import axios from 'axios';
import backendConfig from "../../backendConfig";
import NavBar from "../NavBar";
import '../../App'
import CanvasJSReact from "../../lib/canvasjs.react";
import './Insights.css';


export default class Insights extends Component {

    state = {
      users: [],
      activities : []
    }

    componentDidMount() {
      axios.get(`${backendConfig}/insights/getUsers`)
        .then(res => {
          const users = res.data;
          this.setState({ users : users });
        })

      axios.get(`${backendConfig}/insights/getUserActivities`)
        .then(res => {
          const activities = res.data;
          this.setState({ activities : activities });
        })
    }  

    render() {  
      this.state.users.forEach(user => {
            if(user.organization == undefined){
                user.organization = "Anonymous";
            }
      });

      var organizationList = [];        
      var isOrgAdded = function(orgName){ 
        var added = false;     
        organizationList.forEach(org => {
            if(org.name == orgName){
                added = true;
            }
        });
        return added;
      }    

      this.state.users.forEach(user => {    
        if(isOrgAdded(user.organization)){
            organizationList.forEach(org => {
                if(org.name == user.organization){
                    org.y += 1; 
                }
            });
        }else{
            organizationList.push({
                name : user.organization,
                y : 1
            });
        }
      });

      var CanvasJSChart = CanvasJSReact.CanvasJSChart;

      const doughnutOptions = {
        animationEnabled: true,
        title: {
            text: "User Organization"
        },
        subtitles: [{
            text: "",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###' Members'",
            dataPoints: organizationList
        }]
      }


      var activitiesList = [];  

      var isActivityAdded = function(activityName){ 
        var added = false;     
        activitiesList.forEach(activityCategory => {
            if(activityCategory.label == activityName){
                added = true;
            }
        });
        return added;
      }    
      
      this.state.activities.forEach(activity => {    
        if(isActivityAdded(activity.activityName)){
            activitiesList.forEach(activityCategory => {
                if(activityCategory.label == activity.activityName){
                    activityCategory.y += activity.activityScore; 
                }
            });
        }else{
            activitiesList.push({
                label : activity.activityName,
                y : activity.activityScore
            });
        }
      });

      const barOptions = {
        title: {
            text: "Category Participation"
        },
        data: [
        {
            type: "column",
            dataPoints: activitiesList
        }
        ]
       }

      return (
        <div className='parent'>
          <NavBar />
          <div className='chart'>
          <CanvasJSChart options = {doughnutOptions}
          />
          </div>
          <div className='chart'>
          <CanvasJSChart options = {barOptions}
          />
          </div>
        </div>
      );
    }   
}

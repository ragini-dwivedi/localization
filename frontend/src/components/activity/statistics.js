import NavBar from "../NavBar";
import React, {Component} from "react";
import { Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import backendConfig from "../../backendConfig";
import '../../App.css'

class Statistics extends Component{
    constructor(props) {
        super(props);
        this.state = {
            walking: "",
            running: "",
            statisticsDate: ""
        }
    }

    walkingHandler = (event) => {
        this.setState({walking : event.target.value})
    }

    runningHandler = (event) => {
        this.setState({running : event.target.value})
    }

    dateChangeHandler = (event) => {
        this.setState({statisticsDate : event.target.value})
    }

    updateStatistics = (event) => {

        axios.post(`${backendConfig}/users/addUserStatistics`, {
            email: localStorage.getItem("email"),
            walking: this.state.walking,
            running: this.state.running,
            statisticsDate: this.state.statisticsDate,
        })
            .then((response) => {
                alert('User statistics added successfully');
                document.getElementById("txtDate").value = "";
                document.getElementById("txtwalking").value = "";
                document.getElementById("txtrunning").value = "";
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    render() {

        return (
            <div>
                <NavBar />
                <br />
                <br />
                <div className="container segment">
                    <div className="row" >
                        <div className="col-md-12">
                            <fieldset className="fieldsetStyle">
                                <legend>Add Statistics</legend>
                                <br/>
                                <br/>
                                <br/>
                                <div className="container">
                                    <div className="row" >
                                        <div className="col-md-12">
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td width="20%">
                                                            <label>Date</label>
                                                        </td>
                                                        <td width="80%">
                                                            <TextField style={{
                                                                width: "100%"
                                                            }} id="txtDate" type="date" onChange={this.dateChangeHandler} variant="outlined" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2">
                                                            <br/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="20%">
                                                            <label>Walking in miles</label>
                                                        </td>
                                                        <td width="80%">
                                                            <TextField style={{
                                                                width: "100%"
                                                            }} id="txtwalking" label="Walking in miles" onChange={this.walkingHandler} variant="outlined" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2">
                                                            <br/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="20%">
                                                            <label>Running in miles</label>
                                                        </td>
                                                        <td width="80%">
                                                            <TextField style={{
                                                                width: "100%"
                                                            }} id="txtrunning" label="Running in miles" onChange={this.runningHandler} variant="outlined" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className="row" >
                                        <div className="col-md-12" align="right">
                                            <Button style={{
                                                width: "20%"
                                            }} onClick={this.updateStatistics} color="primary">Update</Button>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Statistics;
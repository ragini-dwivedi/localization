import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import AdminNavBar from "../AdminNavBar";
import TextField from "@material-ui/core/TextField";
import {Button} from "react-bootstrap";
import axios from "axios";
import backendConfig from "../../backendConfig";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
});

class AddEventAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: "",
            eventDescription: "",
            eventImageURL: "",
            eventExpirationDate: ""
        }
    }

    eventNameHandler = (event) => {
        this.setState({ eventName: event.target.name })
    }

    eventScoreHandler = (event) => {
        this.setState({ eventDescription: event.target.name })
    }

    eventImageURLHandler = (event) => {
        this.setState({ eventImageURL: event.target.name })
    }

    eventExpirationDateHandler = (event) => {
        this.setState({ eventExpirationDate: event.target.name })
    }

    addEvent = (event) => {
        axios.post(`${backendConfig}/admin/addEvent`, {
            eventURL: document.getElementById('txtEventImageURL').value,
            eventName: document.getElementById('txtEventName').value,
            eventDescription: document.getElementById('txtEventDescription').value,
            expirationDateTime: document.getElementById('txtEventExpirationDate').value,
        })
            .then((response) => {
                alert('Event added successfully');
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    render() {
        return (
            <div>
                <AdminNavBar />
                <br />
                <br />
                <div className="container segment">
                    <div className="row" >
                        <div className="col-md-12">
                            <fieldset className="fieldsetStyle">
                                <legend>Add Event</legend>
                                <br />
                                <br />
                                <br />
                                <div className="row" >
                                    <div className="col-md-12">
                                        <table width="100%">
                                            <tbody>
                                            <tr>
                                                <td width="20%">
                                                    <label>Event Name</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtEventName" type="text" label="Event Name" onChange={this.eventNameHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Event Description</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtEventDescription" label="Event Score" onChange={this.eventScoreHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Event Image URL</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtEventImageURL" label="Event Image URL" onChange={this.eventImageURLHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Event Expiration Date</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtEventExpirationDate" type="date" onChange={this.eventExpirationDateHandler} variant="outlined" />
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
                                        }} onClick={this.addEvent} color="primary">Add</Button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(AddEventAdmin);
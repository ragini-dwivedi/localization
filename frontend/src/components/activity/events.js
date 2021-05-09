import NavBar from "../NavBar";
import React, {Component} from "react";
import '../../App.css'
import axios from "axios";
import backendConfig from "../../backendConfig";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import {Button} from "react-bootstrap";

class Events extends Component{
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        axios.get(`${backendConfig}/events/getEvents/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    this.setState({events : response.data });
                }
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    handleAddEvent = (event) => {
        let e = event.currentTarget.parentNode.parentNode.childNodes;
        let eventURL = e[0].childNodes[0].currentSrc;
        let eventName = e[1].childNodes[0].data;
        let eventDescription = e[2].childNodes[0].data;
        let expirationDateTime = e[3].childNodes[0].data;
        axios.post(`${backendConfig}/events/addUserEvent`, {
            email: localStorage.getItem("email"),
            eventURL: eventURL,
            eventName: eventName,
            eventDescription: eventDescription,
            expirationDateTime: expirationDateTime
        })
            .then((response) => {
                alert("Event added successfully");
                window.location.href = "/addevents";
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
                                <legend>Add Events</legend>
                                <br/>
                                <br/>
                                <br/>
                                <div className="container">
                                    <div className="row" >
                                        <div className="col-md-12">
                                            <TableContainer component={Paper}>
                                                <Table aria-label="customized table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell><label>Event Image</label></TableCell>
                                                            <TableCell><label>Event Name</label></TableCell>
                                                            <TableCell><label>Event Description</label></TableCell>
                                                            <TableCell><label>Event Expiration</label></TableCell>
                                                            <TableCell><label>Add Events</label></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody className="customTable">
                                                        {this.state.events.map((row) => (
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    <img src={row.eventImage} alt="image" style={{
                                                                        height: "100px",
                                                                        width: "100px"
                                                                    }}/>
                                                                </TableCell>
                                                                <TableCell>{row.eventName}</TableCell>
                                                                <TableCell>{row.eventDescription}</TableCell>
                                                                <TableCell>{row.expirationDateTime}</TableCell>
                                                                <TableCell>
                                                                    {(() => {
                                                                        if (row.buttonDisabled === true) {
                                                                            return (
                                                                                <Button disabled={true} variant="secondary" color="primary"> Signup</Button>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <Button disabled={false} variant="primary" color="primary" onClick={this.handleAddEvent}> Signup</Button>
                                                                            )
                                                                        }
                                                                    })()}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
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

export default Events;
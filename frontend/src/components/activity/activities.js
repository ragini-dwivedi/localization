import NavBar from "../NavBar";
import React, {Component} from "react";
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

class Activities extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activityList: []
        }
    }

    componentDidMount() {
        axios.get(`${backendConfig}/activity/getActivities/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    this.setState({activityList : response.data });
                }
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    handleAddEvent = (event) => {
        let e = event.currentTarget.parentNode.parentNode.childNodes;
        let activityURL = e[0].childNodes[0].currentSrc;
        let activityName = e[1].childNodes[0].data;
        let activityScore = e[2].childNodes[0].data;
        axios.post(`${backendConfig}/activity/addUserActivity`, {
            email: localStorage.getItem("email"),
            activityURL: activityURL,
            activityName: activityName,
            activityScore: activityScore
        })
            .then((response) => {
                alert("Activity added successfully");
                window.location.href = "/addactivities";
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
                                <legend>Add Activities</legend>
                                <br/>
                                <br/>
                                <br/>
                                <div>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><label>Activity Image</label></TableCell>
                                                    <TableCell><label>Activity Name</label></TableCell>
                                                    <TableCell><label>Score</label></TableCell>
                                                    <TableCell><label>Add Activity</label></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className="customTable">
                                                {this.state.activityList.map((row) => (
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            <img src={row.activityImage} alt="image" style={{
                                                                height: "100px",
                                                                width: "100px"
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>{row.activityName}</TableCell>
                                                        <TableCell>{row.activityScore}</TableCell>
                                                        <TableCell>
                                                            {(() => {
                                                                if (row.buttonDisabled === true) {
                                                                    return (
                                                                        <Button disabled={true} variant="secondary" color="primary"> Add Activity</Button>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <Button disabled={false} variant="primary" color="primary" onClick={this.handleAddEvent}> Add Activity</Button>
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
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Activities;
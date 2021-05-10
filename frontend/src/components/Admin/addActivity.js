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

class AddActivityAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityName: "",
            activityScore: "",
            activityImageURL: "",
        }
    }

    activityNameHandler = (event) => {
        this.setState({ activityName: event.target.name })
    }

    activityScoreHandler = (event) => {
        this.setState({ activityScore: event.target.name })
    }

    activityImageURLHandler = (event) => {
        this.setState({ activityImageURL: event.target.name })
    }

    addActivity = (event) => {
        axios.post(`${backendConfig}/admin/addActivity`, {
            activityURL: document.getElementById('txtActivityImageURL').value,
            activityName: document.getElementById('txtActvityName').value,
            activityScore: document.getElementById('txtActivityScore').value,
        })
            .then((response) => {
                alert('Activity added successfully');
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
                                <legend>Add Activity</legend>
                                <br />
                                <br />
                                <br />
                                <div className="row" >
                                    <div className="col-md-12">
                                        <table width="100%">
                                            <tbody>
                                            <tr>
                                                <td width="20%">
                                                    <label>Activity Name</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtActvityName" type="text" label="Activity Name" onChange={this.activityNameHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Activity Score</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtActivityScore" label="Activity Score" onChange={this.activityScoreHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Activity Image URL</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtActivityImageURL" label="Activity Image URL" onChange={this.activityImageURLHandler} variant="outlined" />
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
                                        }} onClick={this.addActivity} color="primary">Add</Button>
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

export default withStyles(useStyles)(AddActivityAdmin);
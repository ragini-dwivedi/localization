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

class AddBadgesAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badgeName: "",
            badges: "",
            badgeImageURL: "",
        }
    }

    badgesNameHandler = (event) => {
        this.setState({ badgeName: event.target.name })
    }

    badgesHandler = (event) => {
        this.setState({ badges: event.target.name })
    }

    badgesImageURLHandler = (event) => {
        this.setState({ badgeImageURL: event.target.name })
    }

    addBadges = (event) => {
        axios.post(`${backendConfig}/admin/addBadge`, {
            badgeName: document.getElementById('txtBadgesName').value,
            badgeScore: document.getElementById('txtBadges').value,
            badgeImageURL: document.getElementById('txtBadgesImageURL').value,
        })
            .then((response) => {
                alert('Badge added successfully');
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
                                <legend>Add Badges</legend>
                                <br />
                                <br />
                                <br />
                                <div className="row" >
                                    <div className="col-md-12">
                                        <table width="100%">
                                            <tbody>
                                            <tr>
                                                <td width="20%">
                                                    <label>Badge Name</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtBadgesName" type="text" label="Badges Name" onChange={this.badgesNameHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Badge Score</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtBadges" label="Badges" onChange={this.badgesHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Badge Image URL</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtBadgesImageURL" label="Badges Image URL" onChange={this.badgesImageURLHandler} variant="outlined" />
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
                                        }} onClick={this.addBadges} color="primary">Add</Button>
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

export default withStyles(useStyles)(AddBadgesAdmin);
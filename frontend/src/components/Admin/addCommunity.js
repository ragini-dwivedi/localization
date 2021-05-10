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

class AddCommunityAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            communityName: "",
            location: "",
            communityImageURL: "",
        }
    }

    communityNameHandler = (event) => {
        this.setState({ communityName: event.target.name })
    }

    communityLocationHandler = (event) => {
        this.setState({ location: event.target.name })
    }

    communityImageURLHandler = (event) => {
        this.setState({ communityImageURL: event.target.name })
    }

    addCommunity = (event) => {
        axios.post(`${backendConfig}/admin/addCommunity`, {
            location: document.getElementById('txtLocation').value,
            communityName: document.getElementById('txtCommunityName').value,
            communityURL: document.getElementById('txtCommunityImageURL').value,
        })
            .then((response) => {
                alert('Community added successfully');
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
                                <legend>Add Community</legend>
                                <br />
                                <br />
                                <br />
                                <div className="row" >
                                    <div className="col-md-12">
                                        <table width="100%">
                                            <tbody>
                                            <tr>
                                                <td width="20%">
                                                    <label>Community Name</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtCommunityName" type="text" label="Community Name" onChange={this.communityNameHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Location</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtLocation" label="Location" onChange={this.communityLocationHandler} variant="outlined" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Community Image URL</label>
                                                </td>
                                                <td width="80%">
                                                    <TextField style={{
                                                        width: "100%"
                                                    }} id="txtCommunityImageURL" label="Community Image URL" onChange={this.communityImageURLHandler} variant="outlined" />
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
                                        }} onClick={this.addCommunity} color="primary">Add</Button>
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

export default withStyles(useStyles)(AddCommunityAdmin);
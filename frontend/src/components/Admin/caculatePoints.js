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

class CalculatePoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: ""
        }
    }

    componentDidMount() {
        let tempDate = new Date();
        let date = (tempDate.getMonth() + 1) + '/' + (tempDate.getDate() + 1) + '/' + tempDate.getFullYear();
        this.setState({ currentDate: date });
    }

    addPoints = (event) => {
        axios.post(`${backendConfig}/admin/calculatepoints`, {
            currentDate: document.getElementById('txtDate').value
        })
            .then((response) => {
                alert(response.data);
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
                                <legend>Calculate Points</legend>
                                <br />
                                <br />
                                <br />
                                <div className="row" >
                                    <div className="col-md-12">
                                        <table width="100%">
                                            <tbody>
                                                <tr>
                                                    <td width="20%">
                                                        <label>Current Date</label>
                                                    </td>
                                                    <td width="80%">
                                                        <TextField style={{
                                                            width: "100%"
                                                        }} id="txtDate" type="name" disabled={true} value={this.state.currentDate} onChange={this.eventDateHandler} variant="outlined" />
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
                                        }} onClick={this.addPoints} color="primary">Calculate</Button>
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

export default withStyles(useStyles)(CalculatePoints);
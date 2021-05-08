//Export the App component so that it can be used in index.js
import NavBar from "../NavBar";
import React, {Component} from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import backendConfig from "../../backendConfig";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableCell } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            username : "",
            password : "",
            fullName: "",
            phone: "",
            activityList: [],
            userGroups: []
        }
    }

    componentDidMount() {
        axios.get(`${backendConfig}/users/getuser/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    this.setState({username : response.data.username });
                    this.setState({password : response.data.password });
                    this.setState({phone : response.data.phone });
                    this.setState({fullName : response.data.fullName });
                }
            })
            .catch(err => {
                alert(err.response.data);
            });

        axios.get(`${backendConfig}/users/getActivities/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    this.setState({activityList : response.data });
                }
            })
            .catch(err => {
                alert(err.response.data);
            });

        axios.get(`${backendConfig}/users/getGroups/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    this.setState({userGroups : response.data });
                }
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    usernameChangeHandler = (e) => {
        this.setState({username : e.target.value})
    };
    passwordChangeHandler = (e) => {
        this.setState({password : e.target.value})
    };
    phoneChangeHandler = (e) => {
        this.setState({phone : e.target.value})
    };
    fullnameChangeHandler = (e) => {
        this.setState({fullName : e.target.value})
    };

    UpdateDetails = (event) => {
        event.preventDefault();
        const data = {
            username : this.state.username,
            fullName: this.state.fullName,
            email : localStorage.getItem("email"),
            password : this.state.password,
            phone: this.state.phone
        };

        axios.post(`${backendConfig}/users/updateuser`, data)
            .then((response) => {
                alert("User updated successfully");
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    handleChange = (event) => {
        if (event.currentTarget.innerText.includes('ACTIVITIES')){
            this.setState({ tabValue : 1 });
        } else if (event.currentTarget.innerText.includes('GROUPS')){
            this.setState({ tabValue : 2 });
        } else if (event.currentTarget.innerText.includes('PERSONAL')){
            this.setState({ tabValue : 0 });
        } else if (event.currentTarget.innerText.includes('GUIDED PROGRAMS')){
            this.setState({ tabValue : 3 });
        }
    };

    handleChangeIndex = (event) => {
        if (event.currentTarget.innerText.includes('ACTIVITIES')){
            this.setState({ tabValue : 1 });
        } else if (event.currentTarget.innerText.includes('GROUPS')){
            this.setState({ tabValue : 2 });
        } else if (event.currentTarget.innerText.includes('PERSONAL')){
            this.setState({ tabValue : 0 });
        } else if (event.currentTarget.innerText.includes('GUIDED PROGRAMS')){
            this.setState({ tabValue : 3 });
        }
    };

    render() {
        return (
            <div>
                <NavBar />
                <br />
                <br />
                <div className="container">
                    <div className="row" >
                        <div className="col-md-12">
                            <div>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={this.state.tabValue}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Personal" {...a11yProps(0)} />
                                        <Tab label="Activities" {...a11yProps(1)} />
                                        <Tab label="Groups" {...a11yProps(2)} />
                                        <Tab label="Guided Programs" {...a11yProps(3)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    index={this.state.tabValue}
                                    onChangeIndex={this.handleChangeIndex}
                                >
                                    <TabPanel value={this.state.tabValue} index={0} >
                                        <div className="container segment">
                                            <br />
                                            <div className="row" >
                                                <div className="col-md-12">
                                                    <Form>
                                                        <Form.Group controlId="formUsername">
                                                            <Form.Label>Full Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="fullName"
                                                                value={this.state.fullName}
                                                                onChange={this.fullnameChangeHandler}
                                                                placeholder="Enter the Fullname" />
                                                        </Form.Group>
                                                        <Form.Group controlId="formUsername">
                                                            <Form.Label>Username</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="username"
                                                                value={this.state.username}
                                                                onChange={this.usernameChangeHandler}
                                                                placeholder="Enter the Username" />
                                                        </Form.Group>
                                                        <Form.Group controlId="formPassword">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                name="Password"
                                                                value={this.state.password}
                                                                onChange={this.passwordChangeHandler}
                                                                placeholder="Enter the Password" />
                                                        </Form.Group>
                                                        <Form.Group controlId="formUsername">
                                                            <Form.Label>Phone</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="phone"
                                                                value={this.state.phone}
                                                                onChange={this.phoneChangeHandler}
                                                                placeholder="Enter the phone number" />
                                                        </Form.Group>
                                                    </Form>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-9">
                                                </div>
                                                <div className="col-md-3" align="right">
                                                    <Button onClick={this.UpdateDetails} color="primary">Update</Button>
                                                </div>
                                            </div>
                                            <br />
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={this.state.tabValue} index={1} >
                                        <div className="container segment" style={{
                                            paddingLeft: "10%",
                                            paddingTop: "3%"
                                        }}>
                                            <br />
                                            <div className="row" >
                                                {this.state.activityList.map((row) => (
                                                    <div className="col-md-3">
                                                        <table width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <img src={row.activityId} alt="image" style={{
                                                                            height: "100px",
                                                                            width: "100px"
                                                                        }}/>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Activity: {row.activityName}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Points: {row.activityScore}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <br />
                                                        <br />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={this.state.tabValue} index={2} >
                                        <div className="container segment">
                                            <br />
                                            <div className="row" >
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <TableContainer component={Paper}>
                                                            <Table aria-label="customized table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell><label>Group Image</label></TableCell>
                                                                        <TableCell><label>Group Name</label></TableCell>
                                                                        <TableCell><label>Group Description</label></TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody className="customTable">
                                                                    {this.state.userGroups.map((row) => (
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">
                                                                                <img src={row.groupImage} alt="image" style={{
                                                                                    height: "100px",
                                                                                    width: "100px"
                                                                                }}/>
                                                                            </TableCell>
                                                                            <TableCell>{row.groupName}</TableCell>
                                                                            <TableCell>{row.groupDescription}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={this.state.tabValue} index={3} >
                                        <div className="container segment">
                                            <br />
                                            <div className="row" >
                                                <div className="col-md-12">
                                                    Item FOUR
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </SwipeableViews>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Form, Button } from 'react-bootstrap';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import icon from '../../image/icon.png';
import image from '../../image/image.jpg';
import axios from 'axios';
import backendConfig from '../../backendConfig';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        fontSize: 30,
        fontWeight: 'bold',
    },
    dialogtext: {
        flexGrow: 1,
        fontSize: 13,
        fontWeight: 'bold',
    },
    text: {
        flexGrow: 1,
        fontSize: 13,
        fontWeight: 'bold',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    message: {
        flexGrow: 1,
        fontSize: 20,
    },
    navbar_root: { //navbar
        flexGrow: 1,
        marginRight: theme.spacing(20),
        marginTop: theme.spacing(2),
    },
    navbar_button: {
        margin: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(20),
    },
    navbar_title: {
        flexGrow: 1,
        fontSize: 25,
    },
    image: {
        textAlign: 'center',
    }
});

class LandingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            //for toggle modal
            open_login : false,
            open_signup : false,
            email : "",
            username : "",
            password : "",
            role : ""
        }
        this.handleClickOpenL = this.handleClickOpenL.bind(this);
        this.handleCloseL = this.handleCloseL.bind(this);
        this.handleClickOpenS = this.handleClickOpenS.bind(this);
        this.handleCloseL = this.handleCloseL.bind(this);
        this.handleHomeButtonEvent = this.handleHomeButtonEvent.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.roleChangeHandler = this.roleChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }
    //handlers
    handleHomeButtonEvent = (event) => {
        event.preventDefault();//stop refresh
        window.location.href = "/"
    }
    handleClickOpenL = () => {
        this.setState({open_login : true});
    };
    handleCloseL = () => {
        this.setState({open_login : false});
    };
    handleClickOpenS = () => {
        this.setState({open_signup : true});
    };
    handleCloseS = () => {
        this.setState({open_signup : false});
    };
    usernameChangeHandler = (e) => {
        this.setState({username : e.target.value})
    };
    emailChangeHandler = (e) => {
        this.setState({email : e.target.value})
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
    roleChangeHandler = (e) => {
        this.setState({role : e.target.value})
    };
    //validate input
    validateInput = () => {
        const inputs = document.querySelectorAll('input');
        let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const error = document.getElementById('errorMsg');
        let isValid = true;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === ""){
                error.textContent = "Please enter your " + (inputs[i].name || "Role");
                isValid = false;
                break;
            }
            else if (!inputs[0].value.match(emailFormat)){
                error.textContent = "Your email format is invalid, please use user@google format";
                isValid = false;
            }
        }
        return isValid;
    }
    submitLogin = (e) => {
        e.preventDefault();
        if (this.validateInput()){
            const data = {
                email : this.state.email,
                password : this.state.password
            };

            axios.post(`${backendConfig}/users/login`, data)
                .then((response) => {
                    localStorage.setItem("email", this.state.email);
                    localStorage.setItem("fullName", response.data.fullName);
                    localStorage.setItem("phone", response.data.phone);
                    window.location.href = "/profile";
                })
                .catch(err => {
                    alert(err.response.data);
                });
        }
    }
    submitSignup = (e) => {
        e.preventDefault();
        if (this.validateInput()){
            const data = {
                username : this.state.username,
                fullName: this.state.fullName,
                email : this.state.email,
                password : this.state.password,
                phone: this.state.phone
            };

            axios.post(`${backendConfig}/users/createuser`, data)
                .then((response) => {
                    alert("User created successfully");
                    localStorage.setItem("email", this.state.email);
                    localStorage.setItem("fullName", response.data.fullName);
                    localStorage.setItem("phone", response.data.phone);
                    window.location.href = "/profile";
                })
                .catch(err => {
                    alert(err.response.data);
                });
        }
    }

    render(){
        const { classes } = this.props;
        console.log(this.state);
        //redirect based on successful login
        let redirectVar = null;
        if(!localStorage.getItem('email')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <div className={classes.navbar_root}>
                    <Toolbar>
                        <IconButton edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={this.handleHomeButtonEvent}
                        >
                            <Avatar alt="Splitwise" src={icon}/>
                        </IconButton>
                        <Typography variant="h6" className={classes.navbar_title}>
                            Fitness Gamification
                        </Typography>
                        <Button color="primary" className={classes.navbar_button} onClick={this.handleClickOpenL}> Log in</Button>
                        <Button color="primary" className={classes.navbar_button} onClick={this.handleClickOpenS}>Sign up</Button>
                    </Toolbar>
                </div>
                <br/>
                <div className={classes.image}>
                    <img src={image} alt="image" style={{
                        height: "800px",
                        width: "1200px"
                    }}/>
                    <br/><br/>
                    <p>&copy; CMPE 280 Group 7</p>
                </div>
                <Dialog fullWidth maxWidth="xs" open={this.state.open_login} onClose={this.handleCloseL} aria-labelledby="form-dialog-title">
                    <DialogTitle>Log In</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.dialogtext}>
                            Please enter the email and password
                        </DialogContentText>
                        <Form>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.emailChangeHandler}
                                    placeholder="Enter the Email" />
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
                        </Form>
                        <div className="error" id="errorMsg" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseL} color="primary">Cancel</Button>
                        <Button onClick={this.submitLogin} color="primary">Log In</Button>
                    </DialogActions>
                </Dialog>

                <Dialog fullWidth maxWidth="xs" open={this.state.open_signup} onClose={this.handleCloseS} aria-labelledby="form-dialog-title">
                    <DialogTitle>Sign Up</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.dialogtext}>
                            Please enter the username, email and password to sign up
                        </DialogContentText>
                        <Form>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.emailChangeHandler}
                                    placeholder="Enter the Email" />
                            </Form.Group>
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
                        <div className="error" id="errorMsg" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseS} color="primary">Cancel</Button>
                        <Button onClick={this.submitSignup} color="primary">Sign Up</Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}

//export Login Component
export default withStyles(useStyles)(LandingPage);
import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import NavBar from "../NavBar";
import { Chart } from "react-google-charts";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import '../../App.css'
import {Button} from "react-bootstrap";
import axios from "axios";
import backendConfig from "../../backendConfig";
import Pusher from 'pusher-js';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
});

class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollQuestion: [],
            question1: "Evening",
            question2: "",
            question3: "",
            question1Counts: [],
            question2Counts: [],
            question3Counts: []
        }
    }

    componentDidMount() {
        const pusher = new Pusher('0a93d3b45b3ecc3479dd', {
            cluster: 'us3',
            encrypted: true
        });
        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', data => {
            this.setState({ question1Counts: data.message.q1 });
            this.setState({ question2Counts: data.message.q2 });
            this.setState({ question3Counts: data.message.q3 });
        });

        axios.get(`${backendConfig}/notification/getUserPolls/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    this.setState({question1 : response.data.userPolls[0].question1 });
                    this.setState({question2 : response.data.userPolls[0].question2 });
                    this.setState({question3 : response.data.userPolls[0].question3 });
                    this.setState({ question1Counts: response.data.q1 });
                    this.setState({ question2Counts: response.data.q2 });
                    this.setState({ question3Counts: response.data.q3 });
                }
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    voteEvent = (event) => {
        //alert(this.state.question1);
        let value = "";
        if (event.currentTarget.name === "question1") {
            value = this.state.question1;
        } else if (event.currentTarget.name === "question2") {
            value = this.state.question2;
        } else if (event.currentTarget.name === "question3") {
            value = this.state.question3;
        }
        axios.post(`${backendConfig}/notification/vote`, {
            email: localStorage.getItem("email"),
            questionSelected: event.currentTarget.name,
            optionSelected: value
        })
            .then((response) => {
                if (response.data){
                    console.log(response.data);
                    alert("voting done successfully");
                }
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    handleChange1 = (event) => {
        this.setState({ question1: event.target.value });
    }

    handleChange2 = (event) => {
        this.setState({ question2: event.target.value });
    }

    handleChange3 = (event) => {
        this.setState({ question3: event.target.value });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <NavBar />
                <br />
                <br />
                <div className="container segment">
                    <div className="row" >
                        <div className="col-md-12">
                            <fieldset className="fieldsetStyle">
                                <legend>Polls</legend>
                                <br />
                                <br />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <Chart
                                                width={'320px'}
                                                height={'240px'}
                                                chartType="BarChart"
                                                loader={<div>Loading Chart</div>}
                                                data={this.state.question1Counts}
                                                options={{
                                                    title: 'Question 1',
                                                    width: 300,
                                                    height: 220,
                                                    bar: { groupWidth: '95%' },
                                                    legend: { position: 'none' },
                                                }}
                                                // For tests
                                                rootProps={{ 'data-testid': '6' }}
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <div className={classes.root} style={{
                                                marginLeft: "50px"
                                            }}>
                                                <FormControl aria-label="question1" component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend" style={{
                                                        color: "#000"
                                                    }}>Which time is better for working out?</FormLabel>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-10">
                                                                <RadioGroup
                                                                    aria-label="Question1"
                                                                    name="question1"
                                                                    className={classes.group}
                                                                    value={this.state.question1}
                                                                    onChange={this.handleChange1}
                                                                >
                                                                    <FormControlLabel value="Morning" control={<Radio />} label="Morning" />
                                                                    <FormControlLabel value="Afternoon" control={<Radio />} label="Afternoon" />
                                                                    <FormControlLabel value="Evening" control={<Radio />} label="Evening" />
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="col-md-2" style={{
                                                                float: "right"
                                                            }}>
                                                                <Button style={{
                                                                    marginLeft: '20px'
                                                                }} onClick={this.voteEvent} name="question1" color="primary">Vote</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <Chart
                                                width={'320px'}
                                                height={'240px'}
                                                chartType="BarChart"
                                                loader={<div>Loading Chart</div>}
                                                data={this.state.question2Counts}
                                                options={{
                                                    title: 'Question 2',
                                                    width: 300,
                                                    height: 220,
                                                    bar: { groupWidth: '95%' },
                                                    legend: { position: 'none' },
                                                }}
                                                // For tests
                                                rootProps={{ 'data-testid': '6' }}
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <div className={classes.root} style={{
                                                marginLeft: "50px"
                                            }}>
                                                <FormControl aria-label="question2" component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend" style={{
                                                        color: "#000"
                                                    }}>Which event do you like?</FormLabel>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-10">
                                                                <RadioGroup
                                                                    aria-label="Question2"
                                                                    name="question2"
                                                                    className={classes.group}
                                                                    value={this.state.question2}
                                                                    onChange={this.handleChange2}
                                                                >
                                                                    <FormControlLabel value="Basketball Game" control={<Radio />} label="Basketball Game" />
                                                                    <FormControlLabel value="Marathon" control={<Radio />} label="Marathon" />
                                                                    <FormControlLabel value="Crossfit Session" control={<Radio />} label="Crossfit Session" />
                                                                    <FormControlLabel value="Team Hiking" control={<Radio />} label="Team Hiking" />
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="col-md-2" style={{
                                                                float: "right"
                                                            }}>
                                                                <Button style={{
                                                                    marginLeft: '20px'
                                                                }} onClick={this.voteEvent} name="question2" color="primary">Vote</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <Chart
                                                width={'320px'}
                                                height={'240px'}
                                                chartType="BarChart"
                                                loader={<div>Loading Chart</div>}
                                                data={this.state.question3Counts}
                                                options={{
                                                    title: 'Question 3',
                                                    width: 300,
                                                    height: 220,
                                                    bar: { groupWidth: '95%' },
                                                    legend: { position: 'none' },
                                                }}
                                                // For tests
                                                rootProps={{ 'data-testid': '6' }}
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <div className={classes.root} style={{
                                                marginLeft: "50px"
                                            }}>
                                                <FormControl aria-label="question3" component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend" style={{
                                                        color: "#000"
                                                    }}>Which activities do you prefer?</FormLabel>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-10">
                                                                <RadioGroup
                                                                    aria-label="Question3"
                                                                    name="question3"
                                                                    className={classes.group}
                                                                    value={this.state.question3}
                                                                    onChange={this.handleChange3}
                                                                >
                                                                    <FormControlLabel value="Running" control={<Radio />} label="Running" />
                                                                    <FormControlLabel value="Hiking" control={<Radio />} label="Hiking" />
                                                                    <FormControlLabel value="Boxing" control={<Radio />} label="Boxing" />
                                                                    <FormControlLabel value="Cycling" control={<Radio />} label="Cycling" />
                                                                </RadioGroup>
                                                            </div>
                                                            <div className="col-md-2" style={{
                                                                float: "right"
                                                            }}>
                                                                <Button style={{
                                                                    marginLeft: '20px'
                                                                }} onClick={this.voteEvent} name="question3" color="primary">Vote</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                            </div>
                                        </div>
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

export default withStyles(useStyles)(Poll);
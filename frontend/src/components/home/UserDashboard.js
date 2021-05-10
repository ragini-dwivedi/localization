//Export the App component so that it can be used in index.js
import {useTranslation} from "react-i18next";
import NavBar from "../NavBar";
import {Button} from "react-bootstrap";
import { Paper } from '@material-ui/core';
import '../../App.css'
import image from "../../image/user.png";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from "react";
import axios from "axios";
import backendConfig from "../../backendConfig";

export default function UserDashboard() {

    const { t } = useTranslation();
    const [userList, setUserList] = useState([]);
    const [userRank, setUserRank] = useState(0);
    const [userScore, setUserScore] = useState(0);

    useEffect(() => {
        axios.get(`${backendConfig}/activity/getAllDetailsForDashboard/1`)
            .then((response) => {
                if (response.data){
                    setUserList(response.data);
                }
            })
            .catch(err => {
                alert(err.response.data);
            });

        axios.get(`${backendConfig}/activity/getWeeklyDetails/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    setUserRank(response.data.rank);
                    setUserScore(response.data.score);
                }
            })
            .catch(err => {
                alert(err.response.data);
            });

    }, []);

    const handleWeeklyData = (e) => {
        axios.get(`${backendConfig}/activity/getAllDetailsForDashboard/1`)
            .then((response) => {
                if (response.data){
                    setUserList(response.data);
                }
            })
            .catch(err => {
                alert(err.response.data);
            });

        axios.get(`${backendConfig}/activity/getWeeklyDetails/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    setUserRank(response.data.rank);
                    setUserScore(response.data.score);
                }
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    const handleOverallData = (e) => {
        axios.get(`${backendConfig}/activity/getAllDetailsForDashboard/2`)
            .then((response) => {
                if (response.data){
                    setUserList(response.data);
                }
            })
            .catch(err => {
                alert(err.response.data);
            });

        axios.get(`${backendConfig}/activity/getOverAllDetails/${localStorage.getItem("email")}`)
            .then((response) => {
                if (response.data){
                    setUserRank(response.data.rank);
                    setUserScore(response.data.score);
                }
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    const data = {
        columns: [
            {
                label: t('name_title'),
                field: 'user',
                sort: 'asc',
                width: 400
            },
            {
                label: t('score_title'),
                field: 'count',
                sort: 'asc',
                width: 320
            },
            {
                label: t('rank_title'),
                field: 'rank',
                sort: 'asc',
                width: 320
            }
        ],
        rows: userList
    };

    return (
        <div>
            <NavBar />
            <div className="mainContainer">
                <h2 className="font-weight-normal mb-3">{t('leadership_title')}</h2>
                <br/>
                <div className="container">
                    <div className="row" >
                        <div className="col-md-12">
                            <div className="container segment">
                                <br />
                                <br />
                                <div className="row" >
                                    <div align="center" className="col-md-6">
                                        <Button style={{
                                            width: "50%"
                                        }} color="primary" onClick={handleWeeklyData}>{t('weekly_label')}</Button>
                                    </div>
                                    <div align="center"  className="col-md-6">
                                        <Button style={{
                                            width: "50%"
                                        }} color="primary" onClick={handleOverallData}>{t('overall_label')}</Button>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="row" >
                                    <div align="center" className="col-md-4">
                                        <div className="row" >
                                            <div align="center" className="col-md-12">
                                                <div className="row" >
                                                    <div align="center" className="col-md-12">
                                                        <label>{t('rank_title')}</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div align="center" className="col-md-12">
                                                        <label style={{
                                                            fontSize: "70px", color: "blue"
                                                        }}>{userRank}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div align="center" className="col-md-4">
                                        <div className="row" >
                                            <div align="center" className="col-md-12">
                                                <img src={image} alt="image" style={{
                                                    height: "150px",
                                                    width: "150px"
                                                }}/>
                                            </div>
                                        </div>
                                        <div className="row" >
                                            <div align="center" className="col-md-12">
                                                <label>{t('email_title')}:</label> {localStorage.getItem('email')}
                                            </div>
                                        </div>
                                    </div>
                                    <div align="center" className="col-md-4">
                                        <div className="row" >
                                            <div align="center" className="col-md-12">
                                                <div className="row">
                                                    <div align="center" className="col-md-12">
                                                        <label>{t('score_title')}</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div align="center" className="col-md-12">
                                                        <label style={{
                                                            fontSize: "70px", color: "green"
                                                        }}>{userScore}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="segment" style={{
                        padding: "2%"
                    }}>
                        <div>
                            <div className="row">
                                <div>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={data}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
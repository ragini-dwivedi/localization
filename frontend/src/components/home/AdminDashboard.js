//Export the App component so that it can be used in index.js
import {useTranslation} from "react-i18next";
import AdminNavbar from "../AdminNavBar";
import '../../App.css'
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from "react";
import axios from "axios";
import backendConfig from "../../backendConfig";

export default function AdminDashboard() {

    const { t } = useTranslation();
    const [userList, setUserList] = useState([]);

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

    }, []);

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
            <AdminNavbar />
            <div className="mainContainer">
                <h2 className="font-weight-normal mb-3">{t('admin_board')}</h2>
                <br/>
                <div className="container">
                    <br />
                    <div className="segment" style={{
                        padding: "2%"
                    }}>
                        <br/>
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
    )
}
//Export the App component so that it can be used in index.js
import {useTranslation} from "react-i18next";
import NavBar from "../NavBar";
import React from "react";

export default function UserDashboard() {
    const { t } = useTranslation();
    const releaseDate = new Date('2021-03-07')
    const timeDifference = new Date() - releaseDate
    const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return (
        <div>
            <NavBar />
            <div className="mainContainer">
                THIS is PROFILE PAGE
                <div className="d-flex flex-column align-items-start">
                    <h1 className="font-weight-normal mb-3">{t('welcome_message')}</h1>
                    <p>{t('days_since_release', { number_of_days })}</p>
                </div>
            </div>
        </div>
    )
}
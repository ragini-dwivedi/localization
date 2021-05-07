//Export the App component so that it can be used in index.js
import {useTranslation} from "react-i18next";
import NavBar from "../NavBar";
import React from "react";
import {Button} from "react-bootstrap";
import '../../App.css'
import image from "../../image/user.png";
import { MDBDataTable } from 'mdbreact';

export default function UserDashboard() {
    const { t } = useTranslation();

    const data = {
        columns: [
            {
                label: t('name_title'),
                field: 'name',
                sort: 'asc',
                width: 500
            },
            {
                label: t('score_title'),
                field: 'score',
                sort: 'asc',
                width: 270
            }
        ],
        rows: [
            {
                name: 'Tiger Nixon',
                score: '$320'
            },
            {
                name: 'Garrett Winters',
                score: '$170'
            },
            {
                name: 'Ashton Cox',
                score: '$86'
            },
            {
                name: 'Cedric Kelly',
                score: '$433'
            },
            {
                name: 'Airi Satou',
                score: '$162'
            },
            {
                name: 'Brielle Williamson',
                score: '$372'
            },
            {
                name: 'Herrod Chandler',
                score: '$137'
            },
            {
                name: 'Rhona Davidson',
                score: '$327'
            },
            {
                name: 'Colleen Hurst',
                score: '$205'
            },
            {
                name: 'Sonya Frost',
                score: '$103'
            },
            {
                name: 'Jena Gaines',
                score: '$90'
            },
            {
                name: 'Quinn Flynn',
                score: '$342'
            },
            {
                name: 'Charde Marshall',
                score: '$470'
            },
            {
                name: 'Haley Kennedy',
                score: '$313'
            },
            {
                name: 'Tatyana Fitzpatrick',
                salary: '$385'
            },
            {
                name: 'Michael Silva',
                score: '$198'
            },
            {
                name: 'Paul Byrd',
                score: '$725'
            },
            {
                name: 'Gloria Little',
                salary: '$237'
            },
            {
                name: 'Bradley Greer',
                score: '$132'
            },
            {
                name: 'Dai Rios',
                salary: '$217'
            },
            {
                name: 'Jenette Caldwell',
                score: '$345'
            },
            {
                name: 'Yuri Berry',
                score: '$675'
            },
            {
                name: 'Caesar Vance',
                score: '$106'
            },
            {
                name: 'Doris Wilder',
                score: '$85'
            },
            {
                name: 'Angelica Ramos',
                score: '$1'
            },
            {
                name: 'Gavin Joyce',
                score: '$92'
            },
            {
                name: 'Jennifer Chang',
                score: '$357'
            },
            {
                name: 'Brenden Wagner',
                score: '$206'
            },
            {
                name: 'Fiona Green',
                score: '$850'
            },
            {
                name: 'Shou Itou',
                score: '$163'
            },
            {
                name: 'Michelle House',
                score: '$95'
            },
            {
                name: 'Suki Burks',
                score: '$114'
            },
            {
                name: 'Prescott Bartlett',
                score: '$145'
            },
            {
                name: 'Gavin Cortez',
                score: '$235'
            },
            {
                name: 'Martena Mccray',
                score: '$324'
            },
            {
                name: 'Unity Butler',
                score: '$85'
            },
            {
                name: 'Howard Hatfield',
                score: '$164'
            },
            {
                name: 'Hope Fuentes',
                score: '$109'
            },
            {
                name: 'Vivian Harrell',
                score: '$452'
            },
            {
                name: 'Timothy Mooney',
                score: '$136'
            },
            {
                name: 'Jackson Bradshaw',
                score: '$645'
            },
            {
                name: 'Olivia Liang',
                score: '$234'
            },
            {
                name: 'Bruno Nash',
                score: '$163'
            },
            {
                name: 'Sakura Yamamoto',
                score: '$139'
            },
            {
                name: 'Thor Walton',
                score: '$98'
            },
            {
                name: 'Finn Camacho',
                score: '$87'
            },
            {
                name: 'Serge Baldwin',
                score: '$138'
            },
            {
                name: 'Zenaida Frank',
                score: '$125'
            },
            {
                name: 'Zorita Serrano',
                score: '$115'
            },
            {
                name: 'Jennifer Acosta',
                score: '$75'
            },
            {
                name: 'Cara Stevens',
                score: '$145'
            },
            {
                name: 'Hermione Butler',
                score: '$356'
            },
            {
                name: 'Lael Greer',
                score: '$103'
            },
            {
                name: 'Jonas Alexander',
                score: '$86'
            },
            {
                name: 'Shad Decker',
                score: '$183'
            },
            {
                name: 'Michael Bruce',
                score: '$183'
            },
            {
                name: 'Donna Snider',
                score: '$112'
            }
        ]
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
                                        }} color="primary">{t('weekly_label')}</Button>
                                    </div>
                                    <div align="center"  className="col-md-6">
                                        <Button style={{
                                            width: "50%"
                                        }} color="primary">{t('overall_label')}</Button>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="row" >
                                    <div align="center" className="col-md-4">
                                        <div className="row" >
                                            <div align="center" className="col-md-12">
                                                <label>{t('rank_title')}</label>
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
                                                <label>{t('score_title')}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="segment">
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
    )
}
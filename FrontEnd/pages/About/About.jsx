import React from 'react';
import Base from "../../components/layout/Base";
import {Fieldset} from "primereact/fieldset";
import {Divider} from "primereact/divider";
import '../../assets/css/pages/About/About.css'



export default function About() {
    const legendTemplate = (
        <div className="flex align-items-center">
            <span className="fa-solid fa-circle-question mr-2"></span>
            <span className="font-bold text-lg">About</span>
        </div>
    );

    return (
        <Base>
            <Fieldset legend={legendTemplate} className="AboutFieldset">
                <p>
                    StarTalk is a social network where you will let your writer's soul express itself. This website will allow
                    you to post your citations.
                </p>
                <Divider align="center" className="DeviderAbout">
                    <p>
                        <i className="fas fa-star"></i>
                        <a href="https://aaw-module.serliapps.dev/projet" target="_blank">Origin</a>
                    </p>
                </Divider>
                <p>
                    This application allows the management of a citations book. There are 2 entry points to StarTalk.
                    The website, which will allow you to consult, search, create citations. The discord bot,
                    which will allow you in the same way to consult the citations, to create them.
                </p>
                <Divider align="center" className="DeviderAbout">
                    <p><i className="fas fa-rocket"></i> Why</p>
                </Divider>
                <p>
                    This site was created as part of the computer science master's degree at the University of Poitiers,
                    specifically for the course of
                    <a href="https://formations.univ-poitiers.fr/fr/index/master-XB/master-XB/master-informatique-JAJEEY0P/parcours-conception-logicielle-JAJEG53Q/architectures-des-applications-web-KZQQ0MBP/ec-architecture-des-applications-web-JC4WK9XX.html"
                       target="_blank">
                         web application architecture.
                    </a>
                </p>
                <Divider align="center" className="DeviderAbout">
                    <p><i className="fas fa-users"></i> Who</p>
                </Divider>
                <p>
                    This site was developed by a team of dedicated developers. You can consult their work
                    on GitHub by clicking on their respective logos.
                </p>
                <div className="developers">
                    <a href="https://github.com/MrArobazz" target="_blank">
                        <i className="fab fa-github"></i>Tom
                    </a>
                    <a href="https://github.com/leoHerv" target="_blank">
                        <i className="fab fa-github"></i>Léo
                    </a>
                    <a href="https://github.com/Al-Natour-Mazen" target="_blank">
                        <i className="fab fa-github"></i>Mazen
                    </a>
                    <a href="https://github.com/Monedsap" target="_blank">
                        <i className="fab fa-github"></i>Macine
                    </a>
                </div>
                <Divider align="center" className="DeviderAbout">
                    <p><i className="fas fa-heart"></i> Acknowledgements</p>
                </Divider>
                <p>
                    Thank you for visiting our site. We hope you enjoy using StarTalk as much as
                    we enjoyed building it!
                </p>
                <p>
                    You will find the complete source code of the project as well as source code of the discord bot by following this
                    <a href="https://github.com/Al-Natour-Mazen/StarTalk_Project" target="_blank">link.</a>
                </p>
            </Fieldset>
        </Base>
    );
}

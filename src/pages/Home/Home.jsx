import React from "react";

import "./Home.scss";

import ButtonHome from "./ButtonHome/ButtonHome";

export default props => (
    <div className="home">
        <div className="title-container">
            <h1 className="title">Solitaire</h1>
            <img className="deck-icon" src={require("./../../assets/icons/deck.png")} alt="deck-icon"></img>
            <ButtonHome className="play-button" label="Play"></ButtonHome>
        </div>
        <div className="footer-container">
            <div>Icons made by Freepik, Smashicons and Good Ware</div>
            <div>0.1.0</div>
        </div>
    </div>
)
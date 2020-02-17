import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

import './Card.scss';

import spades from './../../../../../assets/icons/cards/spades.png';
import clubs from './../../../../../assets/icons/cards/clubs.png';
import diamonds from './../../../../../assets/icons/cards/diamonds.png';
import hearts from './../../../../../assets/icons/cards/hearts.png';
import king from './../../../../../assets/icons/cards/king.png';
import queen from './../../../../../assets/icons/cards/queen.png';
import jack from './../../../../../assets/icons/cards/jack.png';

import cardFlipSound from './../../../../../assets/sounds/cardFlip.mp3';

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suitImg: null,
            centerImg: null,
            flipped: false
        }
        this.flipCard = this.flipCard.bind(this);
        this.defineImages = this.defineImages.bind(this);
    }
    
    componentDidMount() {
        this.defineImages();
        this.makeDraggable();
    }

    componentWillUpdate() {
        console.log('atualizado')
    }

    defineImages() {
        let suitImg;
        let centerImg;

        switch(this.props.suit) {
            case "spades":
                suitImg = spades;
                break;
            case "clubs":
                suitImg = clubs;
                break;
            case "diamonds":
                suitImg = diamonds;
                break;
            case "hearts":
                suitImg = hearts;
                break;
            default:
        }

        switch(this.props.type) {
            case "K":
                centerImg = king;
                break;
            case "Q":
                centerImg = queen;
                break;
            case "J":
                centerImg = jack;
                break;
            default:
                centerImg = suitImg;
        }

        this.setState(state => ({...state, suitImg: suitImg, centerImg: centerImg}));
    }

    makeDraggable() {
        $(() => {
            if(this.props.draggable){
                $("#" + this.props.type + "-" + this.props.suit + "-" + this.props.label).draggable(
                    {
                        containment: "#game-screen-table", 
                        scroll: false                    
                    }
                );
            }
        });
    }

    flipCard(currentTarget) {
        let cardFlip = new Audio(cardFlipSound);
        cardFlip.volume = 0.2;
        cardFlip.play();
        this.setState(state => ({...state, flipped: !state.flipped}));
        if(this.state.flipped) {
            currentTarget.firstChild.style.transform = "rotateY(0deg)";
        }else {
            currentTarget.firstChild.style.transform = "rotateY(180deg)";
        }
    }

    render() {
        return (
            <div className="card-container" id={this.props.type + "-" + this.props.suit + "-" + this.props.label} style={{zIndex: this.props.currentOrder}} onClick={(e) => this.flipCard(e.currentTarget)}>
                <div className="card-container-inner">
                    <div className="card-back">
                        <img src={require("./../../../../../assets/img/back-cards/darkback3.png")} alt="back-card"/>
                    </div>
                    <div className="card-front">
                        <div className="card-top">
                            <div className={"card-type " + (this.props.suit === "diamonds" || this.props.suit === "hearts" ? "red-type" : "dark-type")}>
                                { this.props.type }
                            </div>
                            <div className="card-suit">
                                <img src={this.state.suitImg} alt="suit"></img>
                            </div>
                        </div>
                        <div className="card-center">
                            <img src={this.state.centerImg} alt="center"></img>
                        </div>
                        <div className="card-bottom">
                            <div className="card-suit reverse">
                                <img src={this.state.suitImg} alt="suit"></img>
                            </div>
                            <div className={"card-type reverse " + (this.props.suit === "diamonds" || this.props.suit === "hearts" ? "red-type" : "dark-type")}>
                                { this.props.type }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
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

    initialState = {
        id: this.props.id,
        type:this.props.type,
        suit:this.props.suit,
        label:this.props.label, 
        flipped: this.props.flipped,
        canFlip: this.props.canFlip,
        draggable: this.props.draggable,
        currentOrder: this.props.currentOrder,
        inDiscardPile: this.props.inDiscardPile,
        inFlippedPile: this.props.inFlippedPile,
        columnPile: this.props.columnPile,
        suitImg: null, 
        centerImg: null,
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
        this.defineImages = this.defineImages.bind(this);
        this.makeDraggable = this.makeDraggable.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.setCardTop = this.setCardTop.bind(this);
    }
    
    componentDidMount() {
        this.defineImages();
        this.makeDraggable();
    }

    componentDidUpdate(prevProps, prevStatus) {
        if(this.props.canFlip !== prevProps.canFlip) {
            this.setState({canFlip: this.props.canFlip});
        }
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
        this.setState({suitImg: suitImg, centerImg: centerImg});
    }

    makeDraggable() {
        $(() => {
            if(this.props.draggable){
                $("#" + this.props.type + "-" + this.props.suit + "-" + this.props.label).draggable(
                    {
                        containment: "#game-screen-table", 
                        scroll: false,
                        revert: true,
                        stop: function( event, ui ) {
                            console.log(ui)
                        }                    
                    }
                );
            }
        });
    }

    flipCard(currentTarget) {
        if(this.state.canFlip) {
            let cardFlip = new Audio(cardFlipSound);
            cardFlip.volume = 0.2;
            cardFlip.play();
    
            this.setState(state => ({flipped: !state.flipped}), 
                () => {
                    let transformParameters = "";
                    if(this.state.inDiscardPile) {
                        if(this.props.game === "klondike") {
                            transformParameters += "translate(120%, 0px) ";
                        }
                        this.setState(state => ({inDiscardPile: !state.inDiscardPile, inFlippedPile: true, canFlip: false}), () => {
                            setTimeout(() => {
                                this.props.changePile(this.state);
                            }, 150)
                        })
                    }
                    transformParameters += "rotateY(180deg)";
                    currentTarget.firstChild.style.transform = transformParameters; 
                }
            );
        }
    }

    setCardTop() {
        if(this.state.columnPile !== -1) {
            let currentTop = $("#" + this.props.id).css("top");
            if(currentTop) {
                return (parseInt(currentTop.substring(0, currentTop.indexOf('p'))) + (this.state.currentOrder * 30)).toString() + 'px';
            }
        }
    }

    render() {
        return (
            <div 
                className="card-container" 
                id={this.props.id} 
                style={{zIndex: this.state.currentOrder, top: this.setCardTop()}} 
                onClick={(e) => this.flipCard(e.currentTarget)}>
                <div className="card-container-inner" style={{transform: this.state.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}}>
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
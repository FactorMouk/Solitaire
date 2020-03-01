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

window.jQuery = $;
window.$ = $;
global.jQuery = $;
require('./../../../../../assets/js/jquery-ui.drag-multiple');

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.getSuitImage = this.getSuitImage.bind(this);
        this.getCenterImage = this.getCenterImage.bind(this);
        this.makeDraggable = this.makeDraggable.bind(this);
        this.makeDropArea = this.makeDropArea.bind(this);
        this.checkIfCanFit = this.checkIfCanFit.bind(this);
        this.discardCardInStockPile = this.discardCardInStockPile.bind(this);
        this.setCardTop = this.setCardTop.bind(this);
    }
    
    componentDidMount() {
        this.makeDraggable();
        this.setCardTop();
    }

    componentDidUpdate(prevProps) {
        if(this.props.draggable !== prevProps.draggable) {
            if(this.props.draggable) {
                this.makeDraggable();
            }else {
                this.removeDraggable();
            }
        }
        if(this.props.isDropShowed !== prevProps.isDropShowed) {
            this.makeDropArea()
        }
    }

    getSuitImage() {
        let suitImg;
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
        return suitImg;     
    }

    getCenterImage() {
        let centerImg;
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
                centerImg = this.getSuitImage();
        }
        return centerImg;
    }

    makeDraggable() {
        $(() => {
            if(this.props.draggable){
                $("#" + this.props.id + '_' + this.props.columnPile).draggable(
                    {
                        multiple: true,
                        containment: "#game-screen-table", 
                        scroll: false,
                        revert: true,
                        revertDuration: 350,
                        start: () => {
                            $('#' + this.props.id + '_' + this.props.columnPile).css("z-index", '9999999');
                            this.props.showColumnsDrops(true);
                        },
                        stop: () => {
                            $('#' + this.props.id + '_' + this.props.columnPile).css("left", "auto");
                            $('#' + this.props.id + '_' + this.props.columnPile).css("z-index", this.props.currentOrder);
                            this.props.showColumnsDrops(false);
                        }                    
                    }
                );
            }
        });
    }

    removeDraggable() {
        $(() => {
            $("#" + this.props.id + '_' + this.props.columnPile).draggable('disable');
        });
    }

    makeDropArea() {
        $(() => {
            $("#" + this.props.id + '_' + this.props.columnPile + "-drop-area").droppable(
                {
                    drop: (event, ui) => {
                        this.checkIfCanFit(ui.draggable[0].id);
                    }                  
                }
            );
            
        })
    }

    checkIfCanFit(cardId) {
        if(this.props.game === 'klondike') {
            let types = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
            let isSmaller = types.indexOf(this.props.type) === types.indexOf(cardId.substring(0, cardId.indexOf('-'))) + 1;
            let checkIfAnotherColor = () => {
                let cardDroppedSuit = cardId.substring(cardId.indexOf('-') + 1, cardId.indexOf('-', cardId.indexOf('-') + 1));
                if((this.props.suit === 'spades' || this.props.suit === 'clubs') &&
                    (cardDroppedSuit === 'diamonds' || cardDroppedSuit === 'hearts')
                ) {
                    return true;
                }else if((this.props.suit === 'diamonds' || this.props.suit === 'hearts') &&
                (cardDroppedSuit === 'spades' || cardDroppedSuit === 'clubs')
                ) {
                    return true;
                } else {
                    return false;
                }
            }
            if(isSmaller && checkIfAnotherColor()) {
                this.props.changeColumnOfCard(cardId);
            }
        }
    }

    discardCardInStockPile(currentTarget) {
        if(this.props.inDiscardPile) {
            this.props.discardCardInStockPile(currentTarget);
        }
    }

    setCardTop() {
        if(this.props.columnPile.substring(0, this.props.columnPile.length - 1) === 'column-pile' ) {
            let currentTop = $("#" + this.props.id + "_" + this.props.columnPile).css("top");
            if(currentTop) {
                $("#" + this.props.id + "_" + this.props.columnPile).css("top", (parseInt(currentTop.substring(0, currentTop.indexOf('p'))) + (this.props.currentOrder * 30)).toString() + 'px');
            }
        }
    }

    render() {
        return (
            <div 
                className="card-container" 
                id={this.props.id + '_' + this.props.columnPile} 
                style={{zIndex: this.props.currentOrder}} 
                onClick={(e) => this.discardCardInStockPile(e.currentTarget)}>
                <div className="card-container-inner" style={{transform: this.props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}}>
                    <div className="card-back">
                        <img src={require("./../../../../../assets/img/back-cards/darkback3.png")} alt="back-card"/>
                    </div>
                    <div className="card-front">
                        <div className="card-top">
                            <div className={"card-type " + (this.props.suit === "diamonds" || this.props.suit === "hearts" ? "red-type" : "dark-type")}>
                                { this.props.type }
                            </div>
                            <div className="card-suit">
                                <img src={this.getSuitImage()} alt="suit"></img>
                            </div>
                        </div>
                        <div className="card-center">
                            <img src={this.getCenterImage() } alt="center"></img>
                        </div>
                        <div className="card-bottom">
                            <div className="card-suit reverse">
                                <img src={this.getSuitImage()} alt="suit"></img>
                            </div>
                            <div className={"card-type reverse " + (this.props.suit === "diamonds" || this.props.suit === "hearts" ? "red-type" : "dark-type")}>
                                { this.props.type }
                            </div>
                        </div>
                    </div>
                </div>
                { 
                    this.props.isDropShowed && 
                    <div 
                        id={this.props.id + '_' + this.props.columnPile + "-drop-area"} 
                        className="card-container-drop-area">
                    </div>
                }
            </div>
        )
    }
}
import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/droppable';

import './SuitsPile.scss';

import Card from '../Card/Card';

export default class SuitsPile extends Component {

    constructor(props) {
        super(props);
        this.showColumnsDrops = this.showColumnsDrops.bind(this);
        this.changeColumnOfCard = this.changeColumnOfCard.bind(this);
        this.makeDropArea = this.makeDropArea.bind(this);
        this.checkIfCanFit = this.checkIfCanFit.bind(this);
    }

    componentDidMount() {
        this.makeDropArea();
    }

    showColumnsDrops(show) {
        this.props.showColumnsDrops(show, this.props.id);
    }

    changeColumnOfCard(cardId) {
        this.props.changeColumnOfCard(this.props.id, cardId);
    }

    makeDropArea() {
        $(() => {
            $("#" + this.props.id).droppable(
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
            if(this.props.cards.length === 0 && cardId.substring(0, cardId.indexOf('-')) === "A") {
                this.props.changeColumnOfCard(this.props.id, cardId);
            }else if(this.props.cards.length > 0){
                let suitInTop = this.props.cards[this.props.cards.length-1].suit;
                let typeInTop = this.props.cards[this.props.cards.length-1].type;
                let types = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
                let isBigger = types.indexOf(typeInTop) === types.indexOf(cardId.substring(0, cardId.indexOf('-'))) - 1;
                let cardDroppedSuit = cardId.substring(cardId.indexOf('-') + 1, cardId.indexOf('-', cardId.indexOf('-') + 1));
                if((suitInTop === cardDroppedSuit) && isBigger) {
                    this.props.changeColumnOfCard(this.props.id, cardId);
                }
            }
        }
    }

    render() {
        return (
            <div id={this.props.id} className="suits-pile">
                {this.props.cards.map((card, currentOrder) => (
                    <Card
                        key={card.id} 
                        game={this.props.game}
                        id={card.id} 
                        type={card.type} 
                        suit={card.suit} 
                        label={card.label} 
                        flipped={true}
                        canFlip={false}
                        draggable={(card.draggable || (currentOrder === this.props.cards.length -1)) ? true : false}
                        isDropShowed={false}
                        currentOrder={currentOrder} 
                        inDiscardPile={false}
                        inFlippedPile={false}
                        columnPile={this.props.id}
                        showColumnsDrops={this.showColumnsDrops.bind(this)}
                        changeColumnOfCard={this.changeColumnOfCard.bind(this)}
                    >
                    </Card>
                ))}
            </div>
        )
    }

}
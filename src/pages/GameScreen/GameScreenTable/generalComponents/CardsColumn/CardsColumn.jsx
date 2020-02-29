import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/droppable';

import './CardsColumn.scss';

import Card from './../Card/Card';

export default class CardsColumn extends Component {

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
            $("#card-area-drop-" + this.props.id).droppable(
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
            if(this.props.cards.length === 0 && cardId.substring(0, cardId.indexOf('-')) === "K") {
                this.props.changeColumnOfCard(this.props.id, cardId);
            }
        }
    }

    render() {
        return (
            <div id={this.props.id} className="cards-column">
                <div id={"card-area-drop-" + this.props.id} className="card-area"></div>
                {this.props.cards.map((card, currentOrder) => (
                    <Card
                        key={card.id} 
                        game={this.props.game}
                        id={card.id} 
                        type={card.type} 
                        suit={card.suit} 
                        label={card.label} 
                        flipped={(card.flipped || (currentOrder === this.props.cards.length -1)) ? true : false}
                        canFlip={false}
                        draggable={(card.draggable || (currentOrder === this.props.cards.length - 1)) ? true : false}
                        isDropShowed={currentOrder === this.props.cards.length - 1 && this.props.dropShowed ? true : false}
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
import React, { Component } from 'react';

import './CardsColumn.scss';

import Card from './../Card/Card';

export default class CardsColumn extends Component {

    initialState = {
        currentCards: this.props.cards
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
    }

    render() {
        return (
            <div className="cards-column">
                {this.state.currentCards.map((card, currentOrder) => (
                    <Card
                        key={card.id} 
                        game={this.props.game}
                        id={card.id} 
                        type={card.type} 
                        suit={card.suit} 
                        label={card.label} 
                        flipped={card.flipped}
                        canFlip={currentOrder === this.state.currentCards.length -1 ? true : false} 
                        draggable={card.draggable} 
                        inDiscardPile={false}
                        inFlippedPile={false}
                        columnPile={this.props.columnNumber}
                    >
                    </Card>
                ))}
            </div>
        )
    }

}
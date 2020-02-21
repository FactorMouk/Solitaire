import React, { Component } from 'react';

import './DiscardPile.scss';

import Card from '../../Card/Card';

export default class DiscardPile extends Component {

    constructor(props) {
        super(props);
        this.discardCardInStockPile = this.discardCardInStockPile.bind(this);
        this.returnCards = this.returnCards.bind(this);
    }

    discardCardInStockPile(cardTarget) {
        this.props.discardCardInStockPile(cardTarget);
    }

    returnCards() {
        this.props.returnCards();
    }

    render() {
        return (
            <div id="discard-pile" className="discard-pile">
                {this.props.cards.map((card, currentOrder) => (
                    <Card
                        key={card.id} 
                        game={this.props.game}
                        id={card.id} 
                        type={card.type} 
                        suit={card.suit} 
                        label={card.label} 
                        flipped={card.flipped}
                        canFlip={currentOrder === this.props.cards.length -1 ? true : false} 
                        draggable={false}
                        isDropShowed={false} 
                        currentOrder={currentOrder+1000}
                        inDiscardPile={true}
                        inFlippedPile={false}
                        discardCardInStockPile={this.discardCardInStockPile.bind(this)}
                        columnPile={card.columnPile}
                    >
                    </Card>
                ))}
                <div className="return-cards-button" onClick={()=>{this.returnCards()}}></div>
            </div>
        )
    }

}
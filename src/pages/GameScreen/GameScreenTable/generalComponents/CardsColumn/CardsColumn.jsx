import React, { Component } from 'react';

import './CardsColumn.scss';

import Card from './../Card/Card';

export default class CardsColumn extends Component {

    constructor(props) {
        super(props);
        this.showColumnsDrops = this.showColumnsDrops.bind(this);
        this.changeColumnOfCard = this.changeColumnOfCard.bind(this);
        this.flipCard = this.flipCard.bind(this);
    }

    showColumnsDrops(cardInDragState, show) {
        this.props.showColumnsDrops(cardInDragState, show, this.props.id);
    }

    changeColumnOfCard(cardColumn) {
        this.props.changeColumnOfCard(this.props.id, cardColumn);
    }

    flipCard(cardId, cardTarget) {
        this.props.flipCard(cardId, this.props.id, cardTarget);
    }

    render() {
        return (
            <div id={this.props.id} className="cards-column">
                <div className="card-area"></div>
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
                        flipCard={this.flipCard.bind(this)} 
                        draggable={(currentOrder === this.props.cards.length -1) || card.draggable ? true : false}
                        isDropShowed={currentOrder === this.props.cards.length -1 && this.props.dropShowed ? true : false}
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
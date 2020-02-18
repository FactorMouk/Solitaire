import React, { Component } from 'react';

import './StockPile.scss';

import DiscardPile from './DiscardPile/DiscardPile';
import FlippedPile from './FlippedPile/FlippedPile';

import cardFlipSound from './../../../../../assets/sounds/cardFlip.mp3';

export default class StockPile extends Component {

    initialState = {
        discardCards: this.props.discardCards,
        flippedCards: this.props.flippedCards
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
        this.changePile = this.changePile.bind(this);
        this.returnToDiscard = this.returnToDiscard.bind(this);
    }

    changePile(cardState) {
        let flippedCards = [...this.state.flippedCards];
        flippedCards.push(cardState);
        this.setState({flippedCards: flippedCards})
    }

    returnToDiscard() {
        let flippedCards = [...this.state.flippedCards];
        for(let i = 0; i < flippedCards.length; i++) {
            flippedCards[i].flipped = false;
        }
        flippedCards.reverse();
        for(let i = 0; i < 10; i++) {
            let cardFlip = new Audio(cardFlipSound);
            cardFlip.volume = 0.2;
            cardFlip.play();
        }
        this.setState({discardCards: flippedCards, flippedCards: []});
    }

    render() {
        return (
            <div className="stock-pile">
                <DiscardPile 
                    game={this.props.game} 
                    cards={this.state.discardCards}
                    changePile={this.changePile.bind(this)}
                    returnCards={this.returnToDiscard.bind(this)}
                > 
                </DiscardPile>
                <FlippedPile
                    game={this.props.game}
                    cards={this.state.flippedCards}
                    >
                </FlippedPile>
            </div>
        )
    }

}
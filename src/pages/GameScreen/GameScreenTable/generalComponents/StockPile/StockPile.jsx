import React, { Component } from 'react';

import './StockPile.scss';

import DiscardPile from './DiscardPile/DiscardPile';
import FlippedPile from './FlippedPile/FlippedPile';

export default class StockPile extends Component {

    initialState = {
        discardCards: this.props.discardCards,
        flippedCards: this.props.flippedCards
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
        this.changePile = this.changePile.bind(this);
    }

    changePile(cardState) {
        let flippedCards = [...this.state.flippedCards];
        flippedCards.push(cardState);
        this.setState({flippedCards: flippedCards})
    }

    render() {
        return (
            <div className="stock-pile">
                <DiscardPile 
                    game={this.props.game} 
                    cards={this.state.discardCards}
                    changePile={this.changePile.bind(this)}
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
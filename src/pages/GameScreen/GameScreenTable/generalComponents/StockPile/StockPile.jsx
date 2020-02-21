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
        this.discardCard = this.discardCard.bind(this);
        this.returnToDiscard = this.returnToDiscard.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.discardCards !== prevProps.discardCards || this.props.flippedCards !== prevProps.flippedCards) {
            this.setState({discardCards: this.props.discardCards, flippedCards: this.props.flippedCards});
        }
    }

    discardCard(cardState) {
        this.props.discardCard(cardState);
    }

    returnToDiscard() {
        this.props.returnToDiscard();
    }

    showColumnsDrops(show, id) {
        this.props.showColumnsDrops(show, id);
    }

    render() {
        return (
            <div className="stock-pile">
                <DiscardPile 
                    game={this.props.game} 
                    cards={this.state.discardCards}
                    discardCard={this.discardCard.bind(this)}
                    returnCards={this.returnToDiscard.bind(this)}
                > 
                </DiscardPile>
                <FlippedPile
                    game={this.props.game}
                    cards={this.state.flippedCards}
                    showColumnsDrops={this.showColumnsDrops.bind(this)}
                    >
                </FlippedPile>
            </div>
        )
    }

}
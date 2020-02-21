import React, { Component } from 'react';

import './StockPile.scss';

import DiscardPile from './DiscardPile/DiscardPile';
import FlippedPile from './FlippedPile/FlippedPile';
export default class StockPile extends Component {

    constructor(props) {
        super(props);
        this.discardCardInStockPile = this.discardCardInStockPile.bind(this);
        this.returnToDiscard = this.returnToDiscard.bind(this);
    }

    discardCardInStockPile(cardTarget) {
        this.props.discardCardInStockPile(cardTarget);
    }

    returnToDiscard() {
        this.props.returnToDiscard();
    }

    showColumnsDrops(cardInDragState, show, id) {
        this.props.showColumnsDrops(cardInDragState, show, id);
    }

    render() {
        return (
            <div className="stock-pile">
                <DiscardPile 
                    game={this.props.game} 
                    cards={this.props.discardCards}
                    discardCardInStockPile={this.discardCardInStockPile.bind(this)}
                    returnCards={this.returnToDiscard.bind(this)}
                > 
                </DiscardPile>
                <FlippedPile
                    game={this.props.game}
                    cards={this.props.flippedCards}
                    showColumnsDrops={this.showColumnsDrops.bind(this)}
                    >
                </FlippedPile>
            </div>
        )
    }

}
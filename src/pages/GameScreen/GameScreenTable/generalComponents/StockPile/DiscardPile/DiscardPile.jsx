import React, { Component } from 'react';

import './DiscardPile.scss';

import Card from '../../Card/Card';

export default class DiscardPile extends Component {

    initialState = {
        currentCards: this.props.cards
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
        this.changePile = this.changePile.bind(this);
        this.returnCards = this.returnCards.bind(this);
    }

    componentDidUpdate(prevProps, prevStatus) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({currentCards: this.props.cards})
        }
    }

    changePile(cardState) {
        this.props.changePile(cardState);
        let currentCards = [...this.state.currentCards];
        let index = currentCards.findIndex((card) => card.id === cardState.id);
        currentCards.splice(index, 1);
        if(currentCards[currentCards.length-1]){
            currentCards[currentCards.length-1].canFlip = true;
        }
        this.setState({currentCards: currentCards})
    }

    returnCards() {
        this.props.returnCards();
    }

    render() {
        return (
            <div id="discard-pile" className="discard-pile">
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
                        isDropShowed={false} 
                        currentOrder={currentOrder+1000}
                        inDiscardPile={true}
                        inFlippedPile={false}
                        changePile={this.changePile.bind(this)}
                        columnPile={card.columnPile}
                    >
                    </Card>
                ))}
                <div className="return-cards-button" onClick={()=>{this.returnCards()}}></div>
            </div>
        )
    }

}
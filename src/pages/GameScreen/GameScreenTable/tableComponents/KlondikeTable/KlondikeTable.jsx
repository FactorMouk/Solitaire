import React, { Component } from 'react';

import './KlondikeTable.scss';

import StockPile from '../../generalComponents/StockPile/StockPile';
import SuitsPile from '../../generalComponents/SuitsPile/SuitsPile';
import CardsColumn from '../../generalComponents/CardsColumn/CardsColumn';

export default class KlondikeTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            initialDistribution: {
                discardPile: [],
                flippedPile: [],
                cardsPile1: [],
                cardsPile2: [],
                cardsPile3: [],
                cardsPile4: [],
                cardsPile5: [],
                cardsPile6: [],
                cardsPile7: [],
            },
            currentDistribution: null
        }
        this.generateCards = this.generateCards.bind(this);
        this.shuffleCards = this.shuffleCards.bind(this);
    }

    componentDidMount() {
        this.generateCards();
    }

    generateCards() {
        let cards = [];
        let types = ["K","Q","J","10","9","8","7","6","5","4","3","2","A"];
        let suits = ["spades", "clubs", "diamonds", "hearts"];
        for(let i = 0; i < suits.length; i++) {
            for(let j = 0; j < types.length; j++) {
                cards.push(
                    {
                        id: types[j] + "-" + suits[i] + "-0", 
                        type: types[j], 
                        suit: suits[i], label: "0", 
                        flipped: false,
                        draggable: true, 
                        currentOrder: 0, 
                        inDiscardPile: false,
                        inFlippedPile: false,
                        columnPile: -1,
                        onColumnPileTop: false,
                        suitImg: null, 
                        centerImg: null
                    }
                )
            }
        }
        this.setState(state => ({...state, cards: cards}), () => {
            this.shuffleCards();
        });
    }

    shuffleCards() {
        let amount = 52;
        let numbersArray = [];
        let cards = [...this.state.cards];
        let initialDistribution = {...this.state.initialDistribution};
        for(let i = 0; i < 52; i++) {
            numbersArray.push(i);
        }
        for(let i = 0; i < 24; i++) {
            let randomNumber = Math.floor(Math.random() * amount);
            let removedElement = cards.splice(randomNumber, 1)[0];
            initialDistribution.discardPile.push(removedElement);
            amount--;
        }
        for(let i = 0; i < 28; i++) {
            let randomNumber = Math.floor(Math.random() * amount);
            let removedElement = cards.splice(randomNumber, 1)[0];
            if(i < 1) {
                initialDistribution.cardsPile1.push(removedElement);
            }else if(i < 3) {
                initialDistribution.cardsPile2.push(removedElement);
            }else if(i < 6) {
                initialDistribution.cardsPile3.push(removedElement);
            }else if(i < 10) {
                initialDistribution.cardsPile4.push(removedElement);
            }else if(i < 15) {
                initialDistribution.cardsPile5.push(removedElement);
            }else if(i < 21) {
                initialDistribution.cardsPile6.push(removedElement);
            }else if(i >= 21) {
                initialDistribution.cardsPile7.push(removedElement);
            }
            amount--;
        }
        this.setState({initialDistribution: initialDistribution, currentDistribution: initialDistribution});
    }

    render() {
        return (
            <div className="klondike-table">
                <StockPile 
                    game="klondike" 
                    discardCards={this.state.initialDistribution.discardPile}
                    flippedCards={this.state.initialDistribution.flippedPile}
                >
                </StockPile>
                <div className="suits-piles-container">
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                </div>
                <CardsColumn cards={this.state.initialDistribution.cardsPile1}></CardsColumn>
                <CardsColumn cards={this.state.initialDistribution.cardsPile2}></CardsColumn>
                <CardsColumn cards={this.state.initialDistribution.cardsPile3}></CardsColumn>
                <CardsColumn cards={this.state.initialDistribution.cardsPile4}></CardsColumn>
                <CardsColumn cards={this.state.initialDistribution.cardsPile5}></CardsColumn>
                <CardsColumn cards={this.state.initialDistribution.cardsPile6}></CardsColumn>
                <CardsColumn cards={this.state.initialDistribution.cardsPile7}></CardsColumn>                
            </div>
        )
    }

}
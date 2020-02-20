import React, { Component } from 'react';

import './KlondikeTable.scss';

import StockPile from '../../generalComponents/StockPile/StockPile';
import SuitsPile from '../../generalComponents/SuitsPile/SuitsPile';
import CardsColumn from '../../generalComponents/CardsColumn/CardsColumn';

export default class KlondikeTable extends Component {

    initialState = {
        cards: [],
        distribution: {
            discardPile: [],
            flippedPile: [],
            cardsPiles: [
                {
                    dropShowed: false,
                    cards: []
                },
                {
                    dropShowed: false,
                    cards: []
                },
                {
                    dropShowed: false,
                    cards: []
                },
                {
                    dropShowed: false,
                    cards: []
                },
                {
                    dropShowed: false,
                    cards: []
                },
                {
                    dropShowed: false,
                    cards: []
                },
                {
                    dropShowed: false,
                    cards: []
                }
            ]
        }
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
        this.generateCards = this.generateCards.bind(this);
        this.shuffleCards = this.shuffleCards.bind(this);
        this.showColumnsDrops = this.showColumnsDrops.bind(this);
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
                        suit: suits[i], 
                        label: "0", 
                        flipped: false,
                        canFlip: false,
                        draggable: true,
                        isDropShowed: false, 
                        inDiscardPile: false,
                        inFlippedPile: false,
                        columnPile: -1,
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
        let distribution = {...this.state.distribution};
        for(let i = 0; i < 52; i++) {
            numbersArray.push(i);
        }
        for(let i = 0; i < 24; i++) {
            let randomNumber = Math.floor(Math.random() * amount);
            let removedElement = cards.splice(randomNumber, 1)[0];
            distribution.discardPile.push(removedElement);
            amount--;
        }
        for(let i = 0; i < 28; i++) {
            let randomNumber = Math.floor(Math.random() * amount);
            let removedElement = cards.splice(randomNumber, 1)[0];
            if(i < 1) {
                distribution.cardsPiles[0].cards.push(removedElement);
            }else if(i < 3) {
                distribution.cardsPiles[1].cards.push(removedElement);
            }else if(i < 6) {
                distribution.cardsPiles[2].cards.push(removedElement);
            }else if(i < 10) {
                distribution.cardsPiles[3].cards.push(removedElement);
            }else if(i < 15) {
                distribution.cardsPiles[4].cards.push(removedElement);
            }else if(i < 21) {
                distribution.cardsPiles[5].cards.push(removedElement);
            }else if(i >= 21) {
                distribution.cardsPiles[6].cards.push(removedElement);
            }
            amount--;
        }
        this.setState({distribution: distribution});
    }

    showColumnsDrops(show, columnCallee) {
        let distribution = {...this.state.distribution};
        for(let i = 0; i < distribution.cardsPiles.length; i++) {
            if(i !== columnCallee) {
                distribution.cardsPiles[i].dropShowed = show;
            }
        }
        this.setState({distribution: distribution})
    }

    render() {
        return (
            <div className="klondike-table">
                <StockPile 
                    game="klondike" 
                    discardCards={this.state.distribution.discardPile}
                    flippedCards={this.state.distribution.flippedPile}
                >
                </StockPile>
                <div className="suits-piles-container">
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                </div>
                <CardsColumn id={0} cards={this.state.distribution.cardsPiles[0].cards} dropShowed={this.state.distribution.cardsPiles[0].dropShowed} showColumnsDrops={this.showColumnsDrops.bind(this)}></CardsColumn>
                <CardsColumn id={1} cards={this.state.distribution.cardsPiles[1].cards} dropShowed={this.state.distribution.cardsPiles[1].dropShowed} showColumnsDrops={this.showColumnsDrops.bind(this)}></CardsColumn>
                <CardsColumn id={2} cards={this.state.distribution.cardsPiles[2].cards} dropShowed={this.state.distribution.cardsPiles[2].dropShowed} showColumnsDrops={this.showColumnsDrops.bind(this)}></CardsColumn>
                <CardsColumn id={3} cards={this.state.distribution.cardsPiles[3].cards} dropShowed={this.state.distribution.cardsPiles[3].dropShowed} showColumnsDrops={this.showColumnsDrops.bind(this)}></CardsColumn>
                <CardsColumn id={4} cards={this.state.distribution.cardsPiles[4].cards} dropShowed={this.state.distribution.cardsPiles[4].dropShowed} showColumnsDrops={this.showColumnsDrops.bind(this)}></CardsColumn>
                <CardsColumn id={5} cards={this.state.distribution.cardsPiles[5].cards} dropShowed={this.state.distribution.cardsPiles[5].dropShowed} showColumnsDrops={this.showColumnsDrops.bind(this)}></CardsColumn>
                <CardsColumn id={6} cards={this.state.distribution.cardsPiles[6].cards} dropShowed={this.state.distribution.cardsPiles[6].dropShowed} showColumnsDrops={this.showColumnsDrops.bind(this)}></CardsColumn>                
            </div>
        )
    }

}
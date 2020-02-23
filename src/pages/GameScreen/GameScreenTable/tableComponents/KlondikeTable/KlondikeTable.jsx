import React, { Component } from 'react';

import './KlondikeTable.scss';

import StockPile from '../../generalComponents/StockPile/StockPile';
import SuitsPile from '../../generalComponents/SuitsPile/SuitsPile';
import CardsColumn from '../../generalComponents/CardsColumn/CardsColumn';

import cardFlipSound from './../../../../../assets/sounds/cardFlip.mp3';
export default class KlondikeTable extends Component {

    initialState = {
        cards: [],
        currentDistribution: {
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
        },
        initialDistribution: null,
        currentCardInDrag: null
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
        this.cardSound = this.cardSound.bind(this);
        this.generateCards = this.generateCards.bind(this);
        this.shuffleCards = this.shuffleCards.bind(this);
        this.showColumnsDrops = this.showColumnsDrops.bind(this);
        this.changeColumnOfCard = this.changeColumnOfCard.bind(this);
        this.discardCardInStockPile = this.discardCardInStockPile.bind(this);
        this.returnToDiscard = this.returnToDiscard.bind(this);
    }

    componentDidMount() {
        this.generateCards();
    }

    cardSound() {
        let cardFlip = new Audio(cardFlipSound);
        cardFlip.volume = 0.2;
        cardFlip.play();
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
                        draggable: false,
                        isDropShowed: false, 
                        inDiscardPile: false,
                        inFlippedPile: false,
                        columnPile: 9999
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
        let currentDistribution = {...this.state.currentDistribution};
        for(let i = 0; i < 52; i++) {
            numbersArray.push(i);
        }
        for(let i = 0; i < 24; i++) {
            let randomNumber = Math.floor(Math.random() * amount);
            let removedElement = cards.splice(randomNumber, 1)[0];
            currentDistribution.discardPile.push(removedElement);
            amount--;
        }
        for(let i = 0; i < 28; i++) {
            let randomNumber = Math.floor(Math.random() * amount);
            let removedElement = cards.splice(randomNumber, 1)[0];
            if(i < 1) {
                currentDistribution.cardsPiles[0].cards.push(removedElement);
            }else if(i < 3) {
                currentDistribution.cardsPiles[1].cards.push(removedElement);
            }else if(i < 6) {
                currentDistribution.cardsPiles[2].cards.push(removedElement);
            }else if(i < 10) {
                currentDistribution.cardsPiles[3].cards.push(removedElement);
            }else if(i < 15) {
                currentDistribution.cardsPiles[4].cards.push(removedElement);
            }else if(i < 21) {
                currentDistribution.cardsPiles[5].cards.push(removedElement);
            }else if(i >= 21) {
                currentDistribution.cardsPiles[6].cards.push(removedElement);
            }
            amount--;
        }
        this.setState({currentDistribution: currentDistribution, initialDistribution: currentDistribution});
    }

    discardCardInStockPile(cardTarget) {
        let currentDistribution = {...this.state.currentDistribution};
        let card = {...currentDistribution.discardPile[currentDistribution.discardPile.length-1]};

        this.cardSound();

        let transformParameters = "translate(120%, 0px) rotateY(180deg)";
        cardTarget.firstChild.style.transform = transformParameters; 

        setTimeout(() => {
            currentDistribution.discardPile.pop();
            let cardInTop = currentDistribution.discardPile[currentDistribution.discardPile.length-1];
            if(cardInTop) {
                cardInTop.canFlip = true;
            }
            currentDistribution.flippedPile.push(card);
            this.setState({currentDistribution: currentDistribution});
        }, 150)  
            
    }

    showColumnsDrops(cardInDragState, show, columnCallee) {
        let currentDistribution = {...this.state.currentDistribution};
        for(let i = 0; i < currentDistribution.cardsPiles.length; i++) {
            if(i !== columnCallee) {
                currentDistribution.cardsPiles[i].dropShowed = show;
            }
        }
        if(show) {
            this.setState({currentDistribution: currentDistribution, currentCardInDrag: cardInDragState})
        }else {
            this.setState({currentCardInDrag: null})
        }
    }

    changeColumnOfCard(dropColumn, dragColumn) {
        let currentDistribution = {...this.state.currentDistribution};
        if(dragColumn === 'flipped-pile'){
            currentDistribution.flippedPile.pop();
        }else {
            currentDistribution.cardsPiles[parseInt(dragColumn)].cards.pop();
        }
        let dropColumnCards = {...currentDistribution.cardsPiles[dropColumn]};
        let cardInTopDrop = dropColumnCards.cards[dropColumnCards.cards.length - 1];
        if(cardInTopDrop) {
            cardInTopDrop.flipped = true;
            cardInTopDrop.draggable = false;
        }
        this.cardSound();
        dropColumnCards.cards.push(this.state.currentCardInDrag);
        this.setState({currentDistribution: currentDistribution});
    }

    returnToDiscard() {
        let currentDistribution = {...this.state.currentDistribution};
        for(let i = 0; i < currentDistribution.flippedPile.length; i++) {
            currentDistribution.flippedPile[i].flipped = false;
        }
        currentDistribution.flippedPile.reverse();
        for(let i = 0; i < 10; i++) {
            let cardFlip = new Audio(cardFlipSound);
            cardFlip.volume = 0.2;
            cardFlip.play();
        }
        currentDistribution.discardPile = currentDistribution.flippedPile;
        currentDistribution.flippedPile = [];
        this.setState({currentDistribution: currentDistribution})
    }

    render() {
        return (
            <div className="klondike-table">
                <StockPile 
                    game="klondike" 
                    discardCards={this.state.currentDistribution.discardPile}
                    flippedCards={this.state.currentDistribution.flippedPile}
                    discardCardInStockPile={this.discardCardInStockPile.bind(this)}
                    returnToDiscard={this.returnToDiscard.bind(this)}
                    showColumnsDrops={this.showColumnsDrops.bind(this)}>
                </StockPile>
                <div className="suits-piles-container">
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                    <SuitsPile></SuitsPile>
                </div>
                {
                    this.state.currentDistribution.cardsPiles.map(({cards, dropShowed}, index) => (
                        <CardsColumn 
                            game="klondike"
                            key={index} 
                            id={index} 
                            cards={cards} 
                            dropShowed={dropShowed} 
                            showColumnsDrops={this.showColumnsDrops.bind(this)}
                            changeColumnOfCard={this.changeColumnOfCard.bind(this)}>
                        </CardsColumn>
                    ))
                }
            </div>
        )
    }
}
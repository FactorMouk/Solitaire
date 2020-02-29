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
            suitsPiles: [[],[],[],[]],
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
                        columnPile: null
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
        this.cardSound();
        let currentDistribution = {...this.state.currentDistribution};
        let card = {...currentDistribution.discardPile[currentDistribution.discardPile.length-1]};
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

    showColumnsDrops(show, pileCallee) {
        let currentDistribution = {...this.state.currentDistribution};
        let pileNumber = -1;
        if(pileCallee.includes('column-pile')) {
            pileNumber = parseInt(pileCallee.replace('column-pile', ''));
        }
        for(let i = 0; i < currentDistribution.cardsPiles.length; i++) {
            if(i !== pileNumber) {
                currentDistribution.cardsPiles[i].dropShowed = show;
            }
        }
        this.setState({currentDistribution: currentDistribution})
    }

    changeColumnOfCard(dropColumn, dragCardId) {
        this.cardSound();
        let currentDistribution = {...this.state.currentDistribution};
        let dragColumn = dragCardId.substring(dragCardId.indexOf('_') + 1);
        let dragCardJustId = dragCardId.substring(0, dragCardId.indexOf('_'));
        let dragCard;
        let dragColumnNumber;
        if(dragColumn.includes('flipped-pile')){
            dragCard = {...currentDistribution.flippedPile.filter((card) => card.id === dragCardJustId)[0]};
            currentDistribution.flippedPile.pop();
        }else if(dragColumn.includes('suit-pile')) {
            dragColumnNumber = parseInt(dragColumn.replace('suit-pile',''));
            dragCard = {...currentDistribution.suitsPiles[dragColumnNumber].filter((card) => card.id === dragCardJustId)[0]};
            currentDistribution.suitsPiles[dragColumnNumber].pop();
        }else {
            dragColumnNumber = parseInt(dragColumn.replace('column-pile',''));
            dragCard = {...currentDistribution.cardsPiles[dragColumnNumber].cards.filter((card) => card.id === dragCardJustId)[0]};
            currentDistribution.cardsPiles[dragColumnNumber].cards.pop();
        }
        let dropColumnCards;
        let dropColumnNumber;
        if(dropColumn.includes('suit-pile')) {
            dropColumnNumber = parseInt(dropColumn.replace('suit-pile',''));
            dropColumnCards = currentDistribution.suitsPiles[dropColumnNumber];
        }else if(dropColumn.includes('column-pile')){
            dropColumnNumber = parseInt(dropColumn.replace('column-pile',''));
            dropColumnCards = currentDistribution.cardsPiles[dropColumnNumber].cards;
        }
        let cardInTopDrop = dropColumnCards[dropColumnCards.length - 1];
        if(cardInTopDrop) {
            cardInTopDrop.flipped = true;
            cardInTopDrop.draggable = true;
        }
        dropColumnCards.push(dragCard);
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
                    {
                        this.state.currentDistribution.suitsPiles.map((cards, index) => (
                            <SuitsPile
                                game="klondike" 
                                id={'suit-pile' + index}
                                key={index} 
                                cards={cards}
                                changeColumnOfCard={this.changeColumnOfCard.bind(this)}
                                showColumnsDrops={this.showColumnsDrops.bind(this)}
                            >    
                            </SuitsPile>
                        ))
                    }
                </div>
                {
                    this.state.currentDistribution.cardsPiles.map(({cards, dropShowed}, index) => (
                        <CardsColumn 
                            game="klondike"
                            key={index} 
                            id={'column-pile' + index} 
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
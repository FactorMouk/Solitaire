import React, { Component } from 'react';

import './CardsColumn.scss';

import Card from './../Card/Card';

export default class CardsColumn extends Component {

    initialState = {
        dropShowed: this.props.dropShowed,
        currentCards: this.props.cards
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
        this.showColumnsDrops = this.showColumnsDrops.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.dropShowed !== prevProps.dropShowed) {
            this.setState({dropShowed: this.props.dropShowed});
        }
    }

    showColumnsDrops(show) {
        this.props.showColumnsDrops(show, this.props.id);
    }

    render() {
        return (
            <div className="cards-column">
                <div className="card-area"></div>
                {this.state.currentCards.map((card, currentOrder) => (
                    <Card
                        key={card.id} 
                        game={this.props.game}
                        id={card.id} 
                        type={card.type} 
                        suit={card.suit} 
                        label={card.label} 
                        flipped={currentOrder === this.state.currentCards.length -1 ? true : false}
                        canFlip={false} 
                        draggable={currentOrder === this.state.currentCards.length -1 ? true : false}
                        isDropShowed={currentOrder === this.state.currentCards.length -1 && this.state.dropShowed ? true : false}
                        currentOrder={currentOrder} 
                        inDiscardPile={false}
                        inFlippedPile={false}
                        columnPile={this.props.columnNumber}
                        showColumnsDrops={this.showColumnsDrops.bind(this)}
                    >
                    </Card>
                ))}
            </div>
        )
    }

}
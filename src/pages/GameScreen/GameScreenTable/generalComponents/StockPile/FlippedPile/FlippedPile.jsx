import React, { Component } from 'react';

import './FlippedPile.scss';

import Card from '../../Card/Card';

export default class FlippedPile extends Component {

    constructor(props) {
        super(props);
        this.showColumnsDrops = this.showColumnsDrops.bind(this);
    }

    showColumnsDrops(show) {
        this.props.showColumnsDrops(show, this.props.id);
    }

    render() {
        return (
            <div id={this.props.id} className="flipped-pile">
                {this.props.cards.map((card, currentOrder) => (
                    <Card
                        key={card.id} 
                        game={this.props.game}
                        id={card.id} 
                        type={card.type} 
                        suit={card.suit} 
                        label={card.label} 
                        flipped={true}
                        canFlip={false} 
                        draggable={true}
                        isDropShowed={false}  
                        currentOrder={currentOrder}
                        inDiscardPile={false}
                        inFlippedPile={true}
                        columnPile={this.props.id}
                        showColumnsDrops={this.showColumnsDrops.bind(this)}
                    >
                    </Card>
                ))}
            </div>
        )
    }

}
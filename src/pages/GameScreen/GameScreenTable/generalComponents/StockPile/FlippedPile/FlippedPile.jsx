import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/droppable';

import './FlippedPile.scss';

import Card from '../../Card/Card';

export default class FlippedPile extends Component {

    constructor(props) {
        super(props);
        this.showColumnsDrops = this.showColumnsDrops.bind(this);
    }

    componentDidMount() {
        $("#flipped-pile").droppable({
            drop: function(event, ui) {
                
            }
        });
    }

    showColumnsDrops(cardInDragState, show) {
        this.props.showColumnsDrops(cardInDragState, show, -1);
    }

    render() {
        return (
            <div id="flipped-pile" className="flipped-pile">
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
                        columnPile={card.columnPile}
                        showColumnsDrops={this.showColumnsDrops.bind(this)}
                    >
                    </Card>
                ))}
            </div>
        )
    }

}
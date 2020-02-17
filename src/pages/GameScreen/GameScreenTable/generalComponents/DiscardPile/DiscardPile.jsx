import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/droppable';

import './DiscardPile.scss';

import Card from '../Card/Card';
export default class DiscardPile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCards: []        
        }
    }

    render() {
        return (
            <div id="discard-pile" className="discard-pile">
                {this.props.cards.map((card, currentOrder) => (
                    <Card key={card.key} type={card.type} suit={card.suit} label={card.label} flipped={card.flipped} draggable={card.draggable} currentOrder={currentOrder}></Card>
                ))}
            </div>
        )
    }

}
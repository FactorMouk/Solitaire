import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/droppable';

import './FlippedPile.scss';

import Card from '../../Card/Card';

export default class FlippedPile extends Component {

    initialState = {
        currentCards: this.props.cards       
    }

    constructor(props) {
        super(props);
        this.state = {...this.initialState};
        this.showColumnsDrops = this.showColumnsDrops.bind(this);
    }

    componentDidMount() {
        $("#flipped-pile").droppable({
            drop: function(event, ui) {
                
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({currentCards: this.props.cards})
        }
    }

    showColumnsDrops(show) {
        this.props.showColumnsDrops(show, -1);
    }

    render() {
        return (
            <div id="flipped-pile" className="flipped-pile">
                {this.state.currentCards.map((card, currentOrder) => (
                    <Card
                        key={card.id} 
                        game={this.props.game}
                        id={card.id} 
                        type={card.type} 
                        suit={card.suit} 
                        label={card.label} 
                        flipped={card.flipped}
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
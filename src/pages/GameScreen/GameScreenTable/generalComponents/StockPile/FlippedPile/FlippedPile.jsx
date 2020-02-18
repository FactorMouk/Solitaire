import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/droppable';

import './FlippedPile.scss';

import Card from '../../Card/Card';

export default class FlippedPile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCards: []        
        }
        this.changePile = this.changePile.bind(this);
    }

    componentDidMount() {
        $("#flipped-pile").droppable({
            drop: function(event, ui) {
                
            }
        });
    }

    componentDidUpdate(prevProps, prevStatus) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({currentCards: this.props.cards}, () => {
                
            })
        }
    }

    changePile() {

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
                        draggable={card.draggable} 
                        currentOrder={currentOrder}
                        inDiscardPile={true}
                        changePile={this.changePile.bind(this)}
                        columnPile={card.columnPile}
                        onColumnPileTop={card.onColumnPileTop}
                    >
                    </Card>
                ))}
            </div>
        )
    }

}
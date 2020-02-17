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
        console.log(this.props)
    }

    componentDidMount() {
        $("#discard-pile").droppable({
            drop: function( event, ui ) {
                $(this)
                .addClass("ui-state-highlight");
            }
        });
        this.setState(state => ({...state, currentCards: this.props.cards}), 
        () => {
            console.log(this.state)
            for(let i = 0; i < this.state.currentCards.length; i++) {
                console.log(this.state.currentCards[i])
            }
        });
    }

    render() {
        return (
            <div id="discard-pile" className="discard-pile">
                {this.state.currentCards[0]}
            </div>
        )
    }

}
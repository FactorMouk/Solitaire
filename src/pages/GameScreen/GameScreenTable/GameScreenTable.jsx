import React, { Component } from 'react';

import './GameScreenTable.scss';

import Card from './Card/Card';

export default class GameScreenTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="game-screen-table">
                <Card type="Q" suit="spades" label="0" />
                <Card type="K" suit="spades" label="0"/>
                <Card type="8" suit="hearts" label="0"/>
                <Card type="A" suit="clubs" label="0"/>
                <Card type="2" suit="diamonds" label="0"/>
                <Card type="5" suit="spades" label="0"/>
            </div>
        )
    }

}
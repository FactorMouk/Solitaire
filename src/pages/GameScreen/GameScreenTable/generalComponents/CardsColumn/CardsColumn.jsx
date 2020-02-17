import React, { Component } from 'react';

import './CardsColumn.scss';

import Card from './../Card/Card';

export default class CardsColumn extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cards-column">
                <Card type="8" suit="hearts" label="0" draggable={true}></Card>
            </div>
        )
    }

}
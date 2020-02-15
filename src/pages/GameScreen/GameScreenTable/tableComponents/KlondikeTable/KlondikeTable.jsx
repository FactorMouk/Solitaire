import React, { Component } from 'react';

import './KlondikeTable.scss';

import Card from './../../generalComponents/Card/Card';

export default class KlondikeTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="klondike-table">
                <Card type="K" suit="spades" label="0"></Card>
            </div>
        )
    }

}
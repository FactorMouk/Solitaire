import React, { Component } from 'react';

import './GameScreen.scss';

import GameScreenHeader from './GameScreenHeader/GameScreenHeader';
import GameScreenTable from './GameScreenTable/GameScreenTable';
import GameScreenFooter from './GameScreenFooter/GameScreenFooter';

export default class GameScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="game-screen">
                <div className="dashboard">
                    <GameScreenHeader/>
                    <GameScreenTable gameTable="klondike"/>
                    <GameScreenFooter />
                </div>
            </div>
        )
    }

}
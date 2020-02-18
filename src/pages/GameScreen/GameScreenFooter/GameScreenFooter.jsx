import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import UndoIcon from '@material-ui/icons/Undo';

import './GameScreenFooter.scss';

export default class GameScreenFooter extends Component {

    render() {
        return (
            <div className="game-screen-footer">
                <div className="game-functions left">
                    <button className="game-functions-button">
                        <AddIcon />
                        New Game
                    </button>
                </div>
                <div className="game-timer">
                    <h6>Timer</h6>
                    <div>00:00</div>
                </div>
                <div className="game-functions right">
                    <button className="game-functions-button">
                        <UndoIcon />
                        Undo
                    </button>
                </div>
            </div>
        )
    }

}
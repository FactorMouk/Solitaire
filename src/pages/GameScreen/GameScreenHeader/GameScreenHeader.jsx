import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './GameScreenHeader.scss';

export default class GameScreenHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="game-screen-header">
                <div className="menu-functions left">
                    <IconButton color="primary" aria-label="settings">
                        <ArrowBackIcon style={{fontSize: 25, color: 'white', margin: 15}}/>
                    </IconButton>
                </div>
                <div className="game-name">
                    <h3>Klondike</h3>
                </div>
                <div className="menu-functions right">
                    <IconButton color="primary" aria-label="settings">
                        <SettingsIcon style={{fontSize: 25, color: 'white', margin: 15}}/>
                    </IconButton>
                </div>
            </div>
        )
    }

}
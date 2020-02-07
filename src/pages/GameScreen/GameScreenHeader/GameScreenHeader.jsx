import React, { Component } from 'react';
// import SettingsIcon from '@material-ui/icons/Settings';

import './GameScreenHeader.scss';

export default class GameScreenHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="game-screen-header">
                <div></div>
                <div className="game-name">
                    <h3>{this.props.gameName}</h3>
                </div>
                <div>
                    {/* <SettingsIcon /> */}
                </div>
            </div>
        )
    }

}
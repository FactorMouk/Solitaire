import React, { Component } from 'react';

import './GameScreenTable.scss';

import KlondikeTable from './KlondikeTable/KlondikeTable';
import SpiderTable from './SpiderTable/SpiderTable';
import FreeCellTable from './FreeCellTable/FreeCellTable';
import YukonTable from './YukonTable/YukonTable';
import PyramidTable from './PyramidTable/PyramidTable';
import ThreePeaksTable from './ThreePeaksTable/ThreePeaksTable';
import GolfTable from './GolfTable/GolfTable';
import FortyThievesTable from './FortyThievesTable/FortyThievesTable';
import DemonTable from './DemonTable/DemonTable';

export default class GameScreenTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameTable: null,
            timer: null
        }
    }

    componentWillMount() {
        this.defineTable();
    }

    defineTable() {
        let gameTable;
        switch(this.props.gameTable) {
            case "klondike":
                gameTable = <KlondikeTable></KlondikeTable>
                break;
            case "spider":
                gameTable = <SpiderTable></SpiderTable>
                break;
            case "freeCell":
                gameTable = <FreeCellTable></FreeCellTable>
                break;
            case "yukon":
                gameTable = <YukonTable></YukonTable>
                break;
            case "pyramid":
                gameTable = <PyramidTable></PyramidTable>
                break;
            case "threePeaks":
                gameTable = <ThreePeaksTable></ThreePeaksTable>
                break;
            case "golf":
                gameTable = <GolfTable></GolfTable>
                break;
            case "fortyThieves":
                gameTable = <FortyThievesTable></FortyThievesTable>
                break;
            case "demon":
                gameTable = <DemonTable></DemonTable>
                break;
        }
        this.setState(state => ({...state, gameTable: gameTable}));
    }

    render() {
        return (
            <div className="game-screen-table">
                {this.state.gameTable}
            </div>
        )
    }

}
import React from "react";

import "./SelectionScreen.scss";

export default props => (
  <div className="SelectionScreen">
      <div className="container">
          <h1 className="title">Select your game:</h1>
          <div className="games">
              <div className="card-game">
                <img src={require('./../../assets/icons/games/klondike.png')} alt="klondike game"></img>
                <p className="game-tag"> Klondike Game </p>
              </div>
              <div className="card-game">
                <img src={require('./../../assets/icons/games/spider.png')} alt="spider game"></img>
                <p className="game-tag"> Spider Game </p>
              </div>
              <div className="card-game">
                <img src={require('./../../assets/icons/games/freecell.png')} alt="freecell game"></img>
                <p className="game-tag"> Freecell Game </p>
                </div>
          </div>
          
          <div className="games">
            <div className="card-game">
                <img src={require('./../../assets/icons/games/yukon.png')} alt="yukon game"></img>
                <p className="game-tag"> Youkun Game </p>
            </div>
            <div className="card-game">
              <img src={require('./../../assets/icons/games/pyramid.png')} alt="pyramid game"></img>
              <p className="game-tag"> Pyramid Game </p>
            </div>
            <div className="card-game">
              <img src={require('./../../assets/icons/games/threepeaks.png')} alt="threepeaks game"></img>
              <p className="game-tag"> Threepeaks Game </p>
            </div>

          </div>
          <div className="games">
            <div className="card-game">
              <img src={require('./../../assets/icons/games/golf.png')} alt="golf game"></img>
              <p className="game-tag"> Golf Game </p>
            </div>
            <div className="card-game">
              <img src={require('./../../assets/icons/games/fortythieves.png')} alt="fortythieves game"></img>
              <p className="game-tag"> Fortythieves Game </p>
            </div>
            <div className="card-game">
              <img src={require('./../../assets/icons/games/demon.png')} alt="demon game"></img>
              <p className="game-tag"> Demon Game </p>
            </div>
          </div>
      </div>
  </div>

)

import React from "react";

import "./SelectionScreen.scss";

export default props => (
  <div className="SelectionScreen">
      <div className="container">
          <h1 className="title">Select your game</h1>
          <div className="games">
            <img src={require('./../../assets/icons/games/demon.png')} alt="demon game"></img>
            <img src={require('./../../assets/icons/games/fortythieves.png')} alt="fortythieves game"></img>
            <img src={require('./../../assets/icons/games/freecell.png')} alt="freecell game"></img>
          </div>
          <div className="games">
            <img src={require('./../../assets/icons/games/golf.png')} alt="golf game"></img>
            <img src={require('./../../assets/icons/games/klondike.png')} alt="klondike game"></img>
            <img src={require('./../../assets/icons/games/pyramid.png')} alt="pyramid game"></img>
          </div>
          <div className="games">
            <img src={require('./../../assets/icons/games/spider.png')} alt="spider game"></img>
            <img src={require('./../../assets/icons/games/threepeaks.png')} alt="threepeaks game"></img>
            <img src={require('./../../assets/icons/games/yukon.png')} alt="yukon game"></img>
          </div>
      </div>
  </div>

)

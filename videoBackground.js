import React, {Component} from 'react';

const backgroundVideoStyle = {
  width: '100%',
  height: '700px',
  zIndex: 1,
  overflow: "hidden",
  // position: "absolute",
  opacity: .70,
  pointerEvents: "none",
};

const openTextStyle = {
  zIndex: 2,
  marginTop: "14em",
  position: "fixed",
  textAlign: "center",
  color: "#dddddd",
  fontFamily: "Helvetica Neue, Arial ,sansSerif",
  left: 0,
  right: 0,
}

const openTextTitleStyle = {
  width: '65%',
  height: '65%',
}

const openTextDescriptionStyle = {
  fontSize: "30px",
  fontWeight: 325,
}

const blockStyle = {
  position: "relative",
}

class videoBackground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoURL: "https://www.youtube.com/embed/oLvjXbT1iDg?autoplay=1&modestbranding=1&wmode=transparent&controls=0&showinfo=0&rel=0&loop=1&playlist=oLvjXbT1iDg",
      logo: "https://static1.squarespace.com/static/58d7ce4c893fc0519598fa3b/t/5926e2828419c2469339692a/1495720590553/carbonx?format=1000w"
    }
  }
  render(){
    return(
      <div style={blockStyle}>
        <div style={openTextStyle}>
          <h1>
            <img src={this.state.logo} style={openTextTitleStyle} alt="CarbonX Logo"/>
          </h1>
          <p style={openTextDescriptionStyle}>
            Token Sale Is Live Now
          </p>
        </div>
        <div>
          <iframe style={backgroundVideoStyle}
            src={this.state.videoURL} frameBorder="0" allowFullScreen="1">
          </iframe>
        </div>
      </div>
    );
  }

}

export default videoBackground;

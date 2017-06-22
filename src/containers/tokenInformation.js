import React, {Component} from 'react';
import Particles from 'react-particles-js';

const tokenInformationStyle = {
  zIndex: 3,
  backgroundColor: "#ffffff",
  fontFamily: "Helvetica Neue, Arial ,sansSerif",
  color: "#004033",
  padding: "70px",
  position: "relative",
}

const tokenInformationTextStyle = {
  textAlign: "center",
  position: "absolute",
  marginTop: "7em",
  left: 0,
  right: 0,
  zIndex: 2,
}

const tokenInformationTitleStyle = {
  fontSize: "60px",
  fontWeight: 700,
}

const tokenInformationBodyStyle = {
  fontSize: "20px",
  fontWeight: 400,
}


const tokenInformationImageStyle = {
   width:"165px",
   height:"auto%",
  //position: "absolute",
}


class tokenInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ethereumLogo: "http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/ethereum.png"
    }
  }
  render(){
    return(
      <div style={tokenInformationStyle}>
        <div style={tokenInformationTextStyle}>
          <h2 style={tokenInformationTitleStyle}>
            The CarbonX Token
          </h2>
          <img alt="ethereumLogo" src={this.state.ethereumLogo} style={tokenInformationImageStyle}/>
          <br/><br/>
          <p style={tokenInformationBodyStyle}>
          An exclusive opportunity to participate in CarbonX’s seed funding through a tokenized-equity offering.
            <br/>
            <b>
              Powered by Ethereum
            </b>
          </p>
        </div>

        <Particles styles={{height: '100%'}} params={{
      		particles: {
            number: {
             value: 65,
             density: {
               enable: true,
               value_area: 800
             }
           },
            color: {
              value: "#000000"
            },
            shape: {
              type: "circle",
              stroke: {
                width: 1,
                color: "#004033"
              },
              polygon: {
                nb_sides: 5
              },
            },
      			line_linked: {
              color: "#004033"
      			}
      		}
        }}/>

      </div>

    );
  }

}

export default tokenInformation;

import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import AddressList from './containers/addressList';
import VideoBackground from './containers/videoBackground';
import TokenInformation from './containers/tokenInformation';
import TokenSale from './containers/tokenSale';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      videoURL: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb'
    }
  }

  render() {
    return (
      <div>
        {/*
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">CarbonX</a>
        </nav>
        <VideoBackground/>
        <TokenInformation/>
        */}

        <TokenSale/>
        {/*
        <main className="container">
          <AddressList/>
        </main>
        */}
      </div>
    );
  }
}

export default App

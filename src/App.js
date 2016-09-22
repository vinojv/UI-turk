import React, { Component } from 'react';
import ChatBox from './containers/chatBox';
import Preview from './containers/preview';
import {Chart} from 'react-google-charts';

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {};

  }

  render(){
    return ( 
    <div>
        <Preview></Preview>
        <ChatBox></ChatBox>
      </div>
      )
  }

};

export default App;
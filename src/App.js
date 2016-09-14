import React, { Component } from 'react';
import ChatBox from './containers/chatBox';
import Preview from './containers/preview';

class App extends Component {
  constructor(props, context){
    super(props, context);

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
import React, {Component} from 'react';

import Header from './components/header';
import EditorPage from './containers/editorPage';


class App extends Component {
  constructor(props, context) {
       super(props, context);
   }

   render() {

      return (
        <div>
          <Header></Header>
          <EditorPage/>
        </div>
      )
    }

};

export default App;
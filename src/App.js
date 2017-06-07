import React from 'react';

import TestComponent from './TestComponent';
import Test from './Test';
import { createStore } from 'redux';
import Provider from 'react-redux';
import './reducers/index.js';

function addGifs(state = [],action) {
  if(action.type === 'ADD_GIF') {
    return [...action.gif_url]
  }
}

const store = createStore(addGifs);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // limit: LOAD_SIZE,
      offset: 1,
      images: [],
      preload: false,
      inputValue: '',
      appState: 'trending'
    };
  }
  render() {
    return (
      <Provider store={store}>
      <div>
        {/* <TestComponent /> */}
        <Test />
      </div>
    </Provider>
    );
  }
}

export default App;

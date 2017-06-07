import React from 'react';

import TestComponent from './TestComponent';


class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TestComponent />
      </div>
    );
  }
}

export default App;

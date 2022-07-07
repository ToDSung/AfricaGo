import React, { Component } from 'react';

import Header from './containers/Header';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <h1 className='text-3xl font-bold underline'> Hello, World! </h1>
      </div>
    );
  }
}

export default App;

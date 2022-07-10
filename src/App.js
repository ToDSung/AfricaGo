import React, { Component } from 'react';

import RoomAllocation from './containers/RoomAllocation';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <RoomAllocation
          guest={10}
          room={3}
          onChange={result => console.log(result)}
        />
      </div>
    );
  }
}

export default App;

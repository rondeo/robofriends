import React from 'react';
import CardList from './CardList';
import SearhcBox from './SearchBox';
import { robots } from './robots';

const App = () => {
  return (
    <div className='tc'>
      <h1>RoboFriends</h1>
      <SearhcBox />
      <CardList robots={robots}/>
    </div>
  );
}

export default App;
import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';

class App extends Component {
  constructor() {
    super()
    // state is something that can change and affect the app
    // smart components
    this.state = {
      robots: [],
      searchField: ''
    }
    // console.log('constructor');
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
    // this.setState({ robots: robots });
    // console.log('componentDidMount');
  }

  // random name created like a variable
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }
  
  render() {
    const filteredRobots  = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
    });
    // console.log('render');

    if(this.state.robots.length === 0) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots}/>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
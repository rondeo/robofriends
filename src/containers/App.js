import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
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
    const { robots, searchField } = this.state;

    const filteredRobots  = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    // console.log('render');

    return !robots.length ?
    <h1>Loading...</h1> :
    (
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

export default App;
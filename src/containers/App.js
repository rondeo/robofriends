import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from '../actions.js';

// you can name this whatever you want, but this is the redux standards
const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

// dispatch is what triggers the action
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super()
    // state is something that can change and affect the app
    // smart components
    this.state = {
      robots: []
    }
    // console.log('constructor');
  }

  componentDidMount() {
    // console.log(this.props.store.getState());
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
    // this.setState({ robots: robots });
    // console.log('componentDidMount');
  }
  
  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;

    const filteredRobots  = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    // console.log('render');

    return !robots.length ?
    <h1>Loading...</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundry> 
            <CardList robots={filteredRobots}/>
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
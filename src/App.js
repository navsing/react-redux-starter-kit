import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import {connect} from 'react-redux';
import * as actions from './actions/simpleAction';

class App extends Component {

  componentDidMount() {
    this.props.fetchEventsData();
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventsData: () => {
      dispatch(actions.fetchEventsData())
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import * as actions from "./actions/simpleAction";
import Immutable from 'immutable';
import _ from 'lodash';
import {Button, Icon, IconButton, Textfield} from 'react-mdl';
import ButtonReference from './ButtonReference';

//I use PropTypes to pass props(values) from child to parent
const propTypes = {
  onButtonClickHandler: PropTypes.func.isRequired
};

const emptyList = Immutable.fromJS({
  task_id: 0,
  task_name: 'newValue'
});

class App extends Component {
  addTaskHandler = (task) => {
    this.props.onAddTask(task);
  };

  changeTaskHandler = (index, event) => {
    this.props.onChangeTask(index, event.target.value);
  };

  deleteTaskHandler = (task) => {
    this.props.onDeleteTask(task);
  };

  buttonClickHandler = (task) => {
    this.props.onButtonClickHandler(task);
  };

  render() {
    const tasksList = this.props.taskList;
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">To-Do List</h1>
            {_.map(tasksList.toJS(), (row, index) =>
                <div className="row" style={{display: 'flex', width: '50%', margin: '0 auto'}}>
                  <div className="typefield">
                    <Textfield
                        ref="task_name"
                        label="task"
                        floatingLabel
                        value={row.task_name}
                        onChange={(e) => this.changeTaskHandler(index, e)}
                    />
                    {/* This is my child component*/}
                    <ButtonReference
                      label="ClickMe"
                      taskName={row.task_name}
                      onButtonClickHandler={this.buttonClickHandler}
                    />
                  </div>
                  <div className="removebutton">
                    <IconButton style={{position: 'relative', bottom: '-19px', width: '50%', margin: '0 auto'}}
                                onClick={this.deleteTaskHandler.bind(this, row.task_name)}
                                name="---"
                    />
                  </div>
                </div>
            )}
            <Button colored onClick={this.addTaskHandler.bind(this, emptyList)}>
              Add New Task
            </Button>
        </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state) => {
  const tasks = state.tasks;
  return {
    taskList: tasks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTask: (task) => {
      dispatch(actions.onAddTask(task))
    },
    onDeleteTask: (task) => {
      dispatch(actions.onDeleteTask(task))
    },
    onChangeTask: (index, task) => {
      dispatch(actions.onChangeTask(index, task))
    },
    onButtonClickHandler: (newVal) => {
      dispatch(actions.changeTaskContent(newVal));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.svg';
import TaskToBeCompleted from './TaskToBeCompleted';
import TaskItem from './TaskItem';
import TaskCheckAll from './TaskCheckAll';
import TasksFiltered from './TasksFiltered';
import TasksClearCompleted from './TasksClearCompleted';
import { inject, observer } from 'mobx-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@inject('TaskStore')
@observer
class App extends Component {
  render() {
    const TaskStore = this.props.TaskStore;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Todo-container">
          <input type="text" className="todo-input" placeholder="What needs to be done" ref={TaskStore.todoInput} onKeyUp={TaskStore.addTodo} />

          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
          {TaskStore.todosFiltered.map(task =>
            <TaskItem key={task.id} task={task} />
          )}
          </ReactCSSTransitionGroup>

          <div className="extra-container">
            <TaskCheckAll />
            <TaskToBeCompleted />
          </div>

          <div className="extra-container">
            <TasksFiltered />

            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
            {TodoStore.todosCompletedCount > 0 &&
              <TasksClearCompleted />
            }
            </ReactCSSTransitionGroup>

          </div>

        </div> { /* End Todo-Container */ }
      </div>
    );
  }

  componentDidMount() {
    this.props.TaskStore.retrieveTodos();
  }
}

export default App;

import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const TaskItem = inject('TaskStore')(observer(props => {
  const TaskStore = props.TaskStore;

  return (
    <div>
      <div key={props.task.id} className="todo-item">
        <div className="todo-item-left">
          <input type="checkbox" onChange={(event) => TaskStore.checkTodo(props.task, event)} checked={props.task.completed} />

          {!props.task.editing &&
          <div
            className={classnames({'todo-item-label': true, 'completed': props.task.completed})}
            onDoubleClick={(event) => TaskStore.editTodo(props.task, event)}
          >
            {props.task.title}
          </div>
          }

          {props.task.editing &&
          <input
            className="todo-item-edit" type="text" autoFocus
            defaultValue={props.task.title}
            onBlur={(event) => TaskStore.doneEdit(props.task, event)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                TaskStore.doneEdit(props.task, event);
              } else if (event.key === 'Escape') {
                TaskStore.cancelEdit(props.task, event);
              }
            }}
          />
          }

        </div>
        <div className="remove-item" onClick={(event) => TaskStore.deleteTodo(props.task.id)}>
          &times;
        </div>
      </div>
    </div>
  );
}));

TaskItem.wrappedComponent.propTypes = {
  task: PropTypes.object.isRequired,
  TaskStore: PropTypes.object.isRequired,
};

export default TaskItem;

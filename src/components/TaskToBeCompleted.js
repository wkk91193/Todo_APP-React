import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const TasksToBeCompleted = inject('TaskStore')(observer(props => {
  return (
    <div>
      {props.TaskStore.tasksToBeCompleted} items left
    </div>
  );
}));

TasksToBeCompleted.wrappedComponent.propTypes = {
    TaskStore: PropTypes.object.isRequired,
}

export default TasksToBeCompleted;

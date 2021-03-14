import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';


const TasksClearCompleted = inject('TaskStore')(observer(props => {
  return (
    <div>
      <button onClick={props.TaskStore.clearCompleted}>Clear Completed</button>
    </div>
  );
}));

TasksClearCompleted.wrappedComponent.propTypes = {
  TaskStore: PropTypes.object.isRequired,
};

export default TasksClearCompleted;

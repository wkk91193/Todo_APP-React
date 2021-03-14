import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';


const TasksCheckAll = inject('TaskStore')(observer(props => {
  return (
    <div>
      <label><input type="checkbox" checked={!props.TaskStore.anyRemaining} onChange={props.TaskStore.checkAllTasks} /> Check All</label>
    </div>
  );
}));

TasksCheckAll.wrappedComponent.propTypes = {
    TaskStore: PropTypes.object.isRequired,
};

export default TasksCheckAll;

import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';


const TasksFiltered = inject('TaskStore')(observer(props => {
  const TaskStore = props.TaskStore;
  return (
    <div>
      <button
        onClick={() => TaskStore.updateFilter('all')}
        className={classnames({ 'active': TaskStore.filter === 'all' })}
      >
        All
      </button>

      <button
        onClick={() => TaskStore.updateFilter('active')}
        className={classnames({ 'active': TaskStore.filter === 'active' })}
      >
        Active
      </button>

      <button
        onClick={() => TaskStore.updateFilter('completed')}
        className={classnames({ 'active': TaskStore.filter === 'completed' })}
      >
        Completed
      </button>
    </div>
  );
}));

TasksFiltered.wrappedComponent.propTypes = {
    TaskStore: PropTypes.object.isRequired,
};

export default TasksFiltered;

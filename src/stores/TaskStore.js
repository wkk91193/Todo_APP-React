import React from 'react';
import { observable, action, computed, configure, runInAction } from 'mobx';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';
configure({enforceActions: true});

class TaskStore {
  @observable tasks = [];
  @observable taskInput = React.createRef();
  @observable filter = 'all';
  @observable beforeEditCache = '';
  
  @action retrieveTasks = () => {
    axios.get('/findAllTasks')
      .then(response => {
        let tempTasks = response.data;
        tempTasks.forEach(task => task.editing = false);

        runInAction(() => {
          this.tasks = tempTasks;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action addTask = event => {
    if (event.key === 'Enter') {
      const taskInput = this.taskInput.current.value;

      if (taskInput.trim().length === 0) {
        return;
      }

      axios.post('/createTask', {
        title: taskInput,
        completed: false,
      })
        .then(response => {
          runInAction(() => {
            this.tasks.push({
              id: response.data.id,
              title: response.data.title,
              completed: false,
              editing: false,
            });
          });
        })
        .catch(error => {
          console.log(error);
        });

      this.taskInput.current.value = '';
    }
  }

  @action deleteTask = id => {
    axios.delete('/deleteTaskById/taskId/' + id)
      .then(response => {
        runInAction(() => {
          const index = this.tasks.findIndex(item => item.id === id);
          this.tasks.splice(index, 1);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action checkTask = (task, event) => {
    axios.put('/updateTaskStatus/taskId/' + task.id, {
      title: task.title,
      completed: !task.completed,
    })
      .then(response => {
        runInAction(() => {
          task.completed = !task.completed;
          const index = this.tasks.findIndex(item => item.id === task.id);
          this.tasks.splice(index, 1, task);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action editTask = (task, event) => {
    task.editing = true;
    this.beforeEditCache = task.title;

    const index = this.tasks.findIndex(item => item.id === task.id);

    this.tasks.splice(index, 1, task);
  }

  @action doneEdit = (task, event) => {
    task.editing = false;

    if (event.target.value.trim().length === 0) {
      task.title = this.beforeEditCache;
    } else {
      task.title = event.target.value;
    }

    axios.patch('/todos/' + task.id, {
      title: task.title,
      completed: task.completed,
    })
      .then(response => {
        runInAction(() => {
          const index = this.tasks.findIndex(item => item.id === task.id);
          this.tasks.splice(index, 1, task);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action cancelEdit = (task, event) => {
    task.title = this.beforeEditCache;
    task.editing = false;

    const index = this.tasks.findIndex(item => item.id === task.id);

    this.tasks.splice(index, 1, task);
  }

  @action checkAllTodos = (event) => {
    this.tasks.forEach(task => task.completed = event.target.checked);
    event.persist();

    axios.patch('/todosCheckAll', {
      completed: event.target.checked,
    })
      .then(response => {
        runInAction(() => {
          this.tasks.forEach(task => task.completed = event.target.checked);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action updateFilter = filter => {
    this.filter = filter;
  }


  @action clearCompleted = () => {

    const completed = this.tasks
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    axios.delete('/todosDeleteCompleted', {
      data: {
        todos: completed
      }
    })
      .then(response => {
        runInAction(() => {
          this.tasks = this.tasks.filter(todo => !todo.completed);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @computed get todosCompletedCount() {
    return this.tasks.filter(todo => todo.completed).length;
  }

  @computed get todosFiltered() {
    if (this.filter === 'all') {
      return this.tasks;
    } else if (this.filter === 'active') {
      return this.tasks.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.tasks.filter(todo => todo.completed);
    }

    return this.tasks;
  }

  @computed get remaining() {
    return this.tasks.filter(todo => !todo.completed).length;
  }

  @computed get anyRemaining() {
    return this.remaining !== 0;
  }
}

const store = new TaskStore();
export default store;

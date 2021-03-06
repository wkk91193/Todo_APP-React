import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import{ Provider } from 'mobx-react';
import TaskStore from './stores/TaskStore'


const Root =(
    <Provider TaskStore={TaskStore}>
      <App/>
    </Provider>
)
ReactDOM.render(Root,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
registerServiceWorker();

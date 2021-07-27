import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App';

// Mount function to start up the app
const mount = (el, { onNaviagte, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();
  if (onNaviagte) {
    history.listen(onNaviagte)
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      const { pathName } = history.location;
      if (pathName !== nextPathName) {
        history.push(nextPathName)
      }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };

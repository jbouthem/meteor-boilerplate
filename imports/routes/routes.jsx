import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Dashboard from '../ui/Dashboard.jsx';
import Login from '../ui/Login.jsx';
import NotFound from '../ui/NotFound.jsx';
import Signup from '../ui/Signup.jsx';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = (Component) => {
    if (Meteor.userId()) {
        return <Redirect to='/dashboard' />
    } else {
        return <Component/>
    }
}

const onEnterPrivatePage = (Component) => {
    if (!Meteor.userId()) {
        return <Redirect to='/' />
    } else {
        return <Component/>
    }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if ( isUnauthenticatedPage && isAuthenticated ) {
    browserHistory.replace('/dashboard');
    window.location.reload();
  }

  if ( isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
    window.location.reload();
  }
};

export const routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Login)} />
      <Route exact path='/dashboard'  render={ () => onEnterPrivatePage(Dashboard)}/>
      <Route exact path='/signup' render={ () => onEnterPublicPage(Signup)}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </Router>
);

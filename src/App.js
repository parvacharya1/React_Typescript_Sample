import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import Home from './customer/Home';
import Create from './customer/Create';
import Edit from './customer/Edit';

function App() {
  return (
    <div className="App">
     
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={Edit} />
        </Switch>
      
    </div>
  );
}

export default withRouter(App);

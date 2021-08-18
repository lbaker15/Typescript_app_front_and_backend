import './App.css';
import React from 'react';
import Form from './components/loginForm';
import Dashboard from './components/dashboard';
import AddPlace from './components/addPlace';
import Header from './components/header';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router basename="/">
        <Switch>
          
            <Route path="/login" children={() => (
                  <Form />
            )} />
            
            <Route path="/dashboard">
                  <Header tabs={['Home', 'Add Place', 'Log out']} />
                  <Dashboard />
            </Route>

            <Route path="/addplace">
                  <Header tabs={['Home', 'Add Place', 'Log out']} />
                  <AddPlace />
            </Route>

        </Switch>
      </Router>
    )
  }
}

export default App;

import './App.css';
import React from 'react';
import Form from './components/loginForm';
import Dashboard from './components/dashboard';
import AddPlace from './components/addPlace';
import Header from './components/header';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';


type MyState = {
  validated: boolean
}
class App extends React.Component {
  state: MyState = {
    validated: false
  }
  componentDidMount() {
    let cookie = document.cookie.match(new RegExp('(^| )' + 'tokenName' + '=([^;]+)'));
        if (cookie) {
            this.setState({
                validated: true
            })
        }
  }
  render() {
    const {validated} = this.state;
    return (
      <Router basename="/">
        <Switch>
          
            <Route path="/login" children={() => (
                  <Form />
            )} />
            
            <Route path="/dashboard">
                  <Header tabs={validated ? ['Home', 'Add Place', 'Log out'] : ['Home', 'Add Place', 'Login']} />
                  <Dashboard />
            </Route>

            <Route path="/addplace">
                  <Header tabs={validated ? ['Home', 'Add Place', 'Log out'] : ['Home', 'Add Place', 'Login']} />
                  <AddPlace />
            </Route>

        </Switch>
      </Router>
    )
  }
}

export default App;

import './App.css';
import React from 'react';
import Form from './components/loginForm';
import Dashboard from './components/dashboard';
import AddPlace from './components/addPlace';
import Header from './components/header';
import Logout from './components/logout';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';


type MyState = {
  validated: boolean
}
class App extends React.Component {
  state: MyState = {
    validated: false
  }
  componentDidMount() {
    setTimeout(() => {
      let cookie = document.cookie.match(new RegExp('(^| )' + 'tokenName' + '=([^;]+)'));
          if (cookie) {
              this.setState({
                  validated: true
              })
          }
      // console.log('mount', cookie, this.state.validated)
    }, 2000)
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
                  <Header  />
                  <Dashboard />
            </Route>

            <Route path="/addplace">
                  <Header />
                  <AddPlace />
            </Route>

            <Route path="/logout">
                  <Header />
                  <Logout />
            </Route>

        </Switch>
      </Router>
    )
  }
}

export default App;

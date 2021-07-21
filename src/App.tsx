import './App.css';
import Form from './components/form';
import Dashboard from './components/dashboard';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/home">
          <Form />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;

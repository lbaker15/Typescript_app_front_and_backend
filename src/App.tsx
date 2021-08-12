import './App.css';
import React from 'react';
import Form from './components/form';
import Dashboard from './components/dashboard';
import AddPlace from './components/addPlace';
// import Wrapper from './wrapper';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

// const stateM = useSelector<MyState, MyState["map"]>(
//   (state) => state.map
// );
// const dispatch = useDispatch();
// const onAddMapRedux = (map: string) => {
//   dispatch(addMapRedux(map));
// };

class App extends React.Component {
  // renderList(): JSX.Element[] {
  //   return (
  //     <Form />
  //   )
  // }
  render() {
    return (
      <Router basename="/">
        <Switch>
          
            <Route path="/home" children={() => (
                  <Form />
            )} />
            
            <Route path="/dashboard">
                  <Dashboard />
            </Route>

            <Route path="/addplace">
                  <AddPlace />
            </Route>

        </Switch>
      </Router>
    )
  }
}

export default App;

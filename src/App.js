import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import PostsList from './components/PostsList';
import CreatePost from './components/CreatePost';
import NotFound from './components/NotFound';
import './App.css';

class App extends Component {
  render() {

    return (
      
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={PostsList} />
          <ProtectedRoute exact path="/create" component={CreatePost} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
    )
  }
}

export default App;

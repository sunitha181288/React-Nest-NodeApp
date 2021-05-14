import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import UsersPage from './routes/Users/UsersPage';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import './App.css';

class App extends Component {
  render() {
    const { classes } = this.props
   return (
     <Container maxWidth="md">
       <Box my={4}>
       <Switch>
         <Route exact path="/users/profiles" component={UsersPage} />
         <Redirect to="/users/profiles" />
       </Switch>
       </Box>
     </Container>
    );
  }
}
export default App;

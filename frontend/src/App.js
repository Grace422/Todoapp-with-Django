import './App.css';
import TodoForm from './TodoForm';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'AuthContext';
import LoginPage from 'LoginPage';
import CallbackPage from 'CallbackPage';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
        <Router>
            <Route path="/login" component={LoginPage} />
            <Route path="/callback" component={CallbackPage} />

            {/* Protected Route */}
            <Route path="/dashboard">
                {user ?  <TodoForm/>: <Redirect to="/login" />}
            </Route>
        </Router>
    </div>
  );
}

export default App;

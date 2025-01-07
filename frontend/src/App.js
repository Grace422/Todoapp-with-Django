import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CallBack from './pages/CallBack';
import TodoForm from './pages/TodoForm';
import LanguageSwitcher from './pages/LanguageSwitcher';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback" element={<CallBack />} />
        <Route path="/todos" element={<TodoForm />} />
        <Route path="/lang" element={<LanguageSwitcher />} />
      </Routes>
    </Router>
  );
}

export default App;

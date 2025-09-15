import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoApp from './pages/TodoApp';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!token ? <Login setToken={setToken} setUser={setUser} /> : <Navigate to="/todos" />} 
          />
          <Route 
            path="/register" 
            element={!token ? <Register setToken={setToken} setUser={setUser} /> : <Navigate to="/todos" />} 
          />
          <Route 
            path="/todos" 
            element={token ? <TodoApp token={token} user={user} logout={logout} /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={token ? "/todos" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Register from './components/Register';
import UserDatabase from './components/UserDatabase';
import Login from './components/Login';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';

import './styles/register.css';
import './styles/login.css';
import './styles/admin.css';
import './App.css';


export default function App() {
  const [isValidUser, setIsValidUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const URL = "https://mern-api-crud.vercel.app";



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/register' element={<Register URL={URL} />} />
          <Route path='/login' element={<Login URL={URL} setIsValidUser={setIsValidUser} isValidUser={isValidUser} />} />
          <Route path='/admin-login' element={<Admin URL={URL} setIsAdmin={setIsAdmin} />} />
          <Route
            path="/admin-login/user-database"
            element={isAdmin ? <UserDatabase URL={URL} /> : <Navigate to="/admin-login" />}
          />
          <Route
            path="/dashboard"
            element={isValidUser ? <Dashboard /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </Router>
    </div >
  );
}
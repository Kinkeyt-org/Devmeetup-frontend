import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthForm from './pages/Authform';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CreatePage from './pages/CreatePage';
import Profile from './pages/Profile';
import MyTickets from './pages/MyTickets';
import Search from './pages/Search';
import Navbar from './components/Navbar';

const AppContent = () => {
  const location = useLocation();

  // Only show Navbar on routes not listed here
  const hideNavbarRoutes = ['/login', '/search'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events/create' element={<CreatePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/my-tickets' element={<MyTickets />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<AuthForm />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
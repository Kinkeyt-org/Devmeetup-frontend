import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from './pages/Authform'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'
import Profile from './pages/Profile'
import MyTickets from './pages/MyTickets'

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<AuthForm />} />
            <Route path='/home' element={<Home/>} />
            <Route path='/events/create' element={<CreatePage/>} />
            <Route path= "/profile" element={<Profile/>}/>
            <Route path='/my-tickets' element={<MyTickets/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
    </Router>
  )
}

export default App

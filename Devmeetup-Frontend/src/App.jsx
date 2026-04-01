import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from './pages/Authform'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<AuthForm />} />
            <Route path='/home' element={<Home/>} />
            <Route path='/events/create' element={<CreatePage/>} />
            
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
    </Router>
  )
}

export default App

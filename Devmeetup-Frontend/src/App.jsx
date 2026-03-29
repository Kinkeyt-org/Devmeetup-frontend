import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from './pages/Authform'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<AuthForm />} />
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
    </Router>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from './pages/Authform'
import Dashbord from './pages/Dashbord'

const App = () => {
  return (
    <Router>
        <Routes className="">
            <Route path='/' element={<AuthForm />} />
            <Route path='/dashboard' element={<Dashbord/>}></Route>
        </Routes>
    </Router>
  )
}

export default App

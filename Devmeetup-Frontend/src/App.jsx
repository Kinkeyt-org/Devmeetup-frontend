import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from './pages/Authform'
import Dashboard from './pages/Dashboard'
import EventsPage from './pages/EventsPage'
import CreateEventPage from './pages/Createeventpage'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<AuthForm />} />
            <Route path='/home' element={<Home/>} />
            <Route path='/events' element= {<EventsPage/>}/>
            <Route path='/events/create' element={<CreateEventPage />} />
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
    </Router>
  )
}

export default App

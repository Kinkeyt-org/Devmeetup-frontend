import React from 'react'
import Navbar from '../components/Navbar'
import EventsPage from './EventsPage'

const Home = () => {
  return (
    <div className='mx-auto w-full '>
        <Navbar/>
        <EventsPage/>
    </div>
  )
}

export default Home

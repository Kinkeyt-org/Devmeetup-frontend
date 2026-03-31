import React from 'react'
import Navbar from '../components/Navbar'
import CreatePage from './CreatePage'

const Home = () => {
  return (
    <div className='mx-auto w-full '>
        <Navbar/>
        <CreatePage/>
    </div>
  )
}

export default Home

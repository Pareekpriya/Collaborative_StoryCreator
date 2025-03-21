import { Container } from '@chakra-ui/react'
import React from 'react'
import Navbar from './components/features/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './components/features/Home'
import Login from './Pages/Login'
import { motion } from "framer-motion"
import CreateStory from './components/features/CreateStory'
import Stories from './components/features/Stories'
import Story from './components/features/Story'
import Contribute from './components/features/Contribute'
import FinishedStory from './components/features/finishedStory'


function App() {
  return (
     <Container>
      <Navbar/>
         
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createStory' element={<CreateStory/>}/>
        <Route path='/stories' element={<Stories/>}/>
        <Route path="story/:id" element={<Story/>}/>
        <Route path='/contribute/:id' element={<Contribute/>}/>
        <Route path='/finishedStories' element={<FinishedStory/>}/>
      </Routes>   
      </motion.div>  
        </Container>
  )
}

export default App

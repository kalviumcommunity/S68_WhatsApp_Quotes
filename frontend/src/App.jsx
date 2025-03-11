import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './Pages/Landing'
import { Route, Routes } from 'react-router-dom'
import Form from './Components/Form'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path='/add-data' element={<Form/>}/>
      </Routes>
    </>
  )
}

export default App
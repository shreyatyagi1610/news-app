import React from 'react'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path='' element={<Home/>}>
        </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

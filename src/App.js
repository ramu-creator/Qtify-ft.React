import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import ParticularPage from './pages/ParticularPage'
import NewPage from './pages/NewPage'
import "./styles/style.css"
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/page' element={<ParticularPage/>}/>
        <Route path='/newpage' element={<NewPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}
export default App

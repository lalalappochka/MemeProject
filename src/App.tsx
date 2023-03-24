import './App.css'
import Login from './pages/Login'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Registration from './pages/Registration'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

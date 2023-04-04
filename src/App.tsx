import './App.css'
import Login from './pages/Login'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Registration from './pages/Registration'
import UserProfile from './pages/UserProfile'
import MyMemes from './pages/MyMemes'
import CreateMemes from './pages/CreateMemes'
import Home from './pages/Home'
import Sidebar from './components/UI/sidebar/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/my-memes' element={<MyMemes />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create-memes' element={<CreateMemes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

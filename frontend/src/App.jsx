import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import "./App.css"
import {Toaster} from "react-hot-toast"
import {useSelector} from "react-redux"
import useFetchAuthUser from './hooks/useFetchAuthUser'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
const App = () => {
 useFetchAuthUser()
  const {isLoggedIn} = useSelector(state=>state.auth)
 
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home/> : <Login/>}/>
        <Route path="/login" element={isLoggedIn ? <Home/> : <Login/>}/>
        <Route path="/register" element={isLoggedIn ? <Home/> : <Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

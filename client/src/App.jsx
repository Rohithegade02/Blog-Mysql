import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import PrivateRoute from './components/ProtectedRoute'
// import { AuthProvider } from './context/AuthProvider'
// import DomainDashboard from './pages/DomainDashboard'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './components/Navbar'

import Footer from './components/Footer'
import AddPost from './pages/AddPost'
import SinglePost from './pages/SinglePost'
import { AuthProvider } from './context/AuthProvider'
import CategoryPost from './pages/CategoryPost'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
function App() {
  // const location = useLocation()
  // const queryParams = new URLSearchParams(location.search)
  // const category = queryParams.get('category')
  return (
    <div className='max-w-[100vw] min-h-[100vh]  p-10'>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='category/:categoryName' element={<CategoryPost />} />
              <Route path='post/:id' element={<SinglePost />} />
              <Route path='add' element={<AddPost />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App

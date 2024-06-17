import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import { useContext } from 'react'
// import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout() //logout context
    navigate('/login')
  }
  return (
    <div className='flex bg-[#232F3E] justify-around h-[15vh] rounded-[10px] p-10'>
      <div>
        <Link to='/'>
          <Typography fontSize={'20px'} color={'#fff'} fontWeight={600}>
            BLOG APP
          </Typography>
        </Link>
      </div>
      <div className='flex justify-between gap-5 items-center'>
        <Link className='link' to='/category/science'>
          <Typography fontSize={'16px'} color={'#fff'}>
            Science
          </Typography>
        </Link>
        <Link className='link' to='/category/technology'>
          <Typography fontSize={'16px'} color={'#fff'}>
            Technology
          </Typography>
        </Link>
        <Link className='link' to='/category/design'>
          <Typography fontSize={'16px'} color={'#fff'}>
            Design
          </Typography>
        </Link>
        <div className='flex justify-between ml-10 gap-5'>
          <Link className='link' to='/add'>
            <Typography fontSize={'16px'} color={'#fff'}>
              Add
            </Typography>
          </Link>
          {isAuthenticated ? ( //authenticated or not
            <Typography
              fontSize={'16px'}
              color={'#fff'}
              onClick={handleLogout}
              sx={{ cursor: 'pointer' }}
            >
              Logout
            </Typography>
          ) : (
            <Link className='link' to='/login'>
              <Typography fontSize={'16px'} color={'#fff'}>
                Login
              </Typography>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

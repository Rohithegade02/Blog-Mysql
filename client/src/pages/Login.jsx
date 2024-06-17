import { Button, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthProvider'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    password: '',
  })
  const [nameError, setnameError] = useState({
    //error state
    //name error
    status: false,
    message: '',
  })
  const [passwordError, setPasswordError] = useState({
    //error state
    // password error
    status: false,
    message: '',
  })
  const [error, setError] = useState('') //throws error when on invalid crentionals

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
    if (name === 'name' && value.trim() !== '') {
      setnameError({
        status: false,
        message: '',
      })
    } else if (name === 'password' && value.trim() !== '') {
      setPasswordError({
        status: false,
        message: '',
      })
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()

    setnameError({
      status: false,
      message: '',
    })
    setPasswordError({
      status: false,
      message: '',
    })
    if (!user.name) {
      setnameError({
        status: true,
        message: 'name is required',
      })
      return
    } else if (!user.password) {
      setPasswordError({
        status: true,
        message: 'Password is required',
      })
      return
    }
    const res = await loginUser({
      username: user.name,
      password: user.password,
    })
    console.log(res?.data[0]?.username)
    if (res.success) {
      login(res.token, res?.data[0]?.username) //login context setting token in localstorage
      navigate('/')

      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className='flex justify-center items-center my-auto  h-[89vh]'>
      <form
        onSubmit={handleSubmit}
        className='flex justify-center  flex-col items-center gap-5  p-5'
      >
        <p className='text-[20px] font-bold'>Login</p>

        <div>
          <TextField
            label='name'
            name='name'
            type='name'
            value={user.name}
            onChange={handleChange}
            placeholder='name'
            error={nameError.status}
            helperText={nameError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
              '@media (max-width: 1024px)': { width: '50vw' },
            }}
          />
        </div>
        <div>
          <TextField
            label='Password'
            name='password'
            type='password'
            value={user.password}
            onChange={handleChange}
            placeholder='password'
            error={passwordError.status}
            helperText={passwordError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
              '@media (max-width: 1024px)': { width: '50vw' },
            }}
          />
        </div>
        <p className='text-[#cc0000]'>{error} </p>
        <Button
          type='submit'
          sx={{
            background: '#111827',
            color: 'white',
            textTransform: 'none',
            width: '60vw',
            '@media (min-width: 600px)': { width: '30vw' },
            '@media (max-width: 1024px)': { width: '50vw' },
            '&:hover': {
              backgroundColor: '#111827',
            },
          }}
        >
          Login
        </Button>
        <div>
          <p>
            Don&apos;t have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className='text-[#111827] cursor-pointer underline-offset-1'
            >
              Create
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login

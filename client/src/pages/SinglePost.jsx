import React, { useContext, useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/post'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import moment from 'moment'
import { IconButton, Typography, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { toast } from 'react-toastify'

const SinglePost = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPost(id)
        setPosts(res)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false) // Set loading state to false after data is fetched
      }
    }
    fetchData()
  }, [id])

  const handleDelete = async () => {
    const res = await deletePost(id)
    if (res.includes('Deleted Post Successfully')) {
      toast.success(res)
      navigate('/')
    }
  }

  return (
    <div className=''>
      {isLoading ? ( // Render loading indicator while fetching data
        <div className='flex justify-center items-center'>Loading...</div>
      ) : posts.length === 0 ? (
        <div className='flex justify-center items-center'> Post Not Found</div>
      ) : (
        <div className='bg-[#F3F4F6] flex flex-col items-center gap-10 mb-10'>
          <div className='mt-5'>
            <div>
              <img
                src={`../upload/${posts.img}`}
                alt=''
                className='h-[400px] w-[50vw] rounded-md'
              />
            </div>
            <div className='flex items-center mt-2 gap-5'>
              <div>
                <AccountCircleIcon sx={{ height: '50px', width: '50px' }} />
              </div>
              <div>
                <div>
                  <Typography fontSize={'16px'} fontWeight={600}>
                    {posts?.username?.charAt(0)?.toUpperCase() +
                      posts?.username?.slice(1)}
                  </Typography>
                </div>
                <div>{moment(posts?.date)?.from()}</div>
              </div>
              <div>
                {user === posts?.username ? (
                  <div className='flex gap-5'>
                    <div>
                      <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className='px-10'>
            <Typography>{posts?.description}</Typography>
          </div>
        </div>
      )}
    </div>
  )
}

export default SinglePost

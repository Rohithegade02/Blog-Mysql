import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllPost } from '../api/post'
import { Typography, CircularProgress } from '@mui/material'

const CategoryPost = () => {
  const navigate = useNavigate()
  const { categoryName } = useParams() //fetc categoryName from params
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPost(categoryName)
        setPosts(res)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false) // Set loading state to false after data is fetched
      }
    }
    fetchData()
  }, [categoryName])

  return (
    <div className='h-full'>
      {isLoading ? ( // Render loading indicator while fetching data
        <div className='flex justify-center items-center h-full'>
          Loading...
        </div>
      ) : posts.length === 0 ? (
        <div className='flex justify-center items-center h-full'>
          No Posts Found
        </div>
      ) : (
        <div>
          {posts?.map(post => (
            <div
              className='flex gap-5 items-start p-5 hover:bg-[#E0E0E0] rounded-md cursor-pointer'
              key={post.id}
              onClick={() => navigate(`/post/${post?.id}`)}
            >
              <div className='flex-0.3'>
                <img
                  src={`../upload/${post?.img}`}
                  alt=''
                  className='h-[400px] w-[30vw] mt-[10px] rounded-md'
                />
              </div>

              <div className='flex flex-1 flex-col mt-10 gap-5'>
                <div>
                  <Typography fontSize={'20px'} fontWeight={600}>
                    {post?.title?.charAt(0)?.toUpperCase() +
                      post?.title?.slice(1)}
                  </Typography>
                </div>

                <div>
                  <Typography>{post?.description}</Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPost

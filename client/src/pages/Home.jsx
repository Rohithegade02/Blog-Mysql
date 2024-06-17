import { Button, Card, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import EastIcon from '@mui/icons-material/East'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAllPost } from '../api/post'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const navigate = useNavigate()
  const cat = useLocation()?.search
  const category = cat?.split('=')[1]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPost(category)
        setPosts(res)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false) // Set loading state to false after data is fetched
      }
    }
    fetchData()
  }, [category])
  console.log(posts)
  return (
    <div className='flex flex-col gap-5'>
      {isLoading ? ( // Render loading indicator while fetching data
        <div className='flex justify-center items-center h-full'>
          Loading...
        </div>
      ) : (
        <>
          <div>
            {posts?.slice(0, 1)?.map(post => (
              <div className='flex gap-10 bg-[#F3F4F6] p-12' key={post.id}>
                <div className=''>
                  <img
                    src={`../upload/${post.img}`}
                    alt=''
                    className='h-[450px] w-[100%] rounded-lg'
                  />
                </div>

                <div className='flex flex-col gap-5'>
                  <div>
                    <Button
                      sx={{
                        backgroundColor: '#210F04',
                        borderRadius: '30px',
                        color: '#fff',
                        padding: '10px',
                        marginTop: '10px',
                        fontWeight: 600,
                      }}
                    >
                      Featured
                    </Button>
                  </div>
                  <div>
                    <Link className='link' to={`/post/${post?.img}`}>
                      <Typography
                        fontSize={'24px'}
                        fontWeight={600}
                        color={'#210F04'}
                      >
                        {post?.title?.charAt(0).toUpperCase() +
                          post?.title?.slice(1)}
                      </Typography>
                    </Link>
                  </div>
                  <div>
                    <Typography color={'#605D67'}>
                      {post?.description?.split('.')[0]}
                    </Typography>
                  </div>
                  <div>
                    <button
                      onClick={() => navigate(`/post/${post?.id}`)}
                      className='text-[18px]'
                    >
                      Read More
                      <EastIcon sx={{ marginLeft: '10px' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Typography
              sx={{ marginBottom: '15px' }}
              fontSize={'24px'}
              fontWeight={600}
            >
              Recent Posts
            </Typography>
          </div>
          <div className='flex gap-12 flex-wrap mb-10'>
            {posts?.map(post => (
              <Card
                sx={{ width: '430px', cursor: 'pointer', padding: '10px' }}
                key={post.id}
                onClick={() => navigate(`/post/${post?.id}`)}
              >
                <div>
                  <img
                    src={`../upload/${post?.img}`}
                    alt=''
                    className='h-[250px] w-[100%]'
                  />
                </div>

                <div className='flex flex-col gap-5'>
                  <Typography
                    fontSize={'20px'}
                    sx={{ marginTop: '10px' }}
                    fontWeight={600}
                    color={'#210F04'}
                  >
                    {post?.title?.charAt(0)?.toUpperCase() +
                      post?.title?.slice(1)}
                  </Typography>

                  <div>
                    <Typography color={'#605D67'}>
                      {post?.description?.split('.')[0]}
                    </Typography>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home

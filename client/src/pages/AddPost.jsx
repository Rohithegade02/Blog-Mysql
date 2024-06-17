import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { addPost } from '../api/post'
import { toast } from 'react-toastify'
import { Button, Checkbox, TextField } from '@mui/material'
import moment from 'moment'

const AddPost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('http://localhost:4000/upload', {
        //image upload api
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Failed to upload file')
      }
      const data = await res.json()
      if (!data.success) {
        throw new Error('Upload failed')
      }

      return data.data
    } catch (err) {
      console.error('Upload failed:', err)
      throw err
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = await upload()

    try {
      const data = {
        title,
        description,
        img: imgUrl,
        date: moment(Date.now())?.format('YYYY-MM-DD HH:mm:ss'), //formating date
        category,
        token: localStorage.getItem('token'),
      }

      const res = await addPost(data)
      console.log(res)
      if (res?.success) {
        toast.success(res?.message)
        navigate('/')
      }
    } catch (err) {
      console.log(err.Error)
      toast.error(
        'Error in Uploading incase if description is too long make it short',
      )
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-5 mt-10'>
        <div>
          <TextField
            type='text'
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type='text'
            placeholder='Title'
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={10}
            multiline={true}
            fullWidth
          />
        </div>
      </div>
      <div>
        <div className='flex  items-center'>
          <h1>Category</h1>

          <div>
            <Checkbox
              type='radio'
              checked={category === 'science'}
              name='cat'
              value='science'
              id='science'
              onChange={e => setCategory(e.target.value)}
            />
            <label>Science</label>
          </div>
          <div>
            <Checkbox
              type='radio'
              checked={category === 'technology'}
              name='cat'
              value='technology'
              id='technology'
              onChange={e => setCategory(e.target.value)}
            />
            <label htmlFor='technology'>Technology</label>
          </div>

          <div>
            <Checkbox
              type='radio'
              checked={category === 'design'}
              name='cat'
              value='design'
              id='design'
              onChange={e => setCategory(e.target.value)}
            />
            <label htmlFor='design'>Design</label>
          </div>
        </div>
      </div>
      <div>
        <label className='file' htmlFor='file'>
          Upload Image:
        </label>
        <input
          style={{
            backgroundColor: '#232F3E',
            color: '#fff',
            marginLeft: '5px  ',
          }}
          type='file'
          id='file'
          name=''
          onChange={e => setFile(e.target.files[0])}
        />

        <div>
          <Button
            onClick={handleClick}
            sx={{
              backgroundColor: '#232F3E',
              color: '#fff',
              padding: '10px',
              marginX: '45%',
              width: '10vw',
              marginBottom: '10px',
            }}
          >
            Upload Data
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddPost

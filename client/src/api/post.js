const baseUrl = `http://localhost:4000/api/v1/posts`
//getallPost api
export const getAllPost = async category => {
  try {
    const url = category ? `${baseUrl}/?category=${category}` : `${baseUrl}/`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }

    const data = await res.json()
    return data
  } catch (err) {
    console.error('Failed to fetch posts:', err)
    throw err
  }
}
//add a new post api
export const addPost = async data => {
  try {
    const res = await fetch(`${baseUrl}/add`, {
      credentials: 'include', // Include credentials (cookies) with the request
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Failed to add post')
    }
    const result = await res.json()
    return result
  } catch (err) {
    console.error('Failed to add post:', err)
    throw err
  }
}
//get Post api
export const getPost = async id => {
  console.log(id)
  try {
    const url = `${baseUrl}/${id}`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch post')
    }

    const data = await res.json()
    return data
  } catch (err) {
    console.error('Failed to fetch post:', err)
    throw err
  }
}
//delete a post api
export const deletePost = async id => {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'Delete',
      credentials: 'include',
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error('Failed to delete post:', err)
    throw err
  }
}

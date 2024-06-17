const baseUrl = `http://localhost:4000/api/v1/auth/`

//register user api
export async function registerUser(data) {
  console.log(data)
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    localStorage.setItem('token', result.token)
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}
//login user api
export async function loginUser(data) {
  try {
    const response = await fetch(`${baseUrl}login`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}

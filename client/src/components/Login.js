import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useAPI } from '../hooks/useAPI'
import { useForm } from '../hooks/useForm'

const initialFormValues = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
    const [values, handleChanges, resetForm] = useForm(initialFormValues)
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory() 
    const [data, moveData, error] = useAPI({
      method: 'post',
      url: '/api/login',
      data: values
  })

    const postLogin = () => {
      moveData()
      .then( res => {
        // console.log(res)
        localStorage.setItem('token', res.payload)
        setIsLoading(false)
        history.push('/bubbles')
        resetForm()
      })
    .catch( err => console.log(err))
    }

    const login = (e) => {
      e.preventDefault()
      setIsLoading(true)
      // console.log(values)
      postLogin()
      // axiosWithAuth()
      // .post('/api/login', credentials)
      
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <section>
            <form onSubmit={login}>
                <input 
                    type='text'
                    name='username'
                    placeholder='username'
                    value={values.username}
                    onChange={handleChanges}
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='password'
                    value={values.password}
                    onChange={handleChanges}
                />
                {!isLoading ? <button>Log In</button> : <button disabled>Loading...</button>}
            </form>

        </section>
    </>
  );
};

export default Login;

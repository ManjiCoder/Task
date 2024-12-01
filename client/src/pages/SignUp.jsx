import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import headersList from '../utils/constant';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let p = fetch('http://localhost:3000/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headersList,
    })
      .then((res) => res.json())
      .then((v) => {
        Cookies.set('token', v.authToken, { expires: 7 });
        setIsAuth(true);
        setTimeout(() => {
          navigate('/');
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        Cookies.remove('token');
        setIsAuth(false);
      });

    toast.promise(p, {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    });
  };
  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='name'
            name='name'
            placeholder='Enter your name'
            value={data.name}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={data.email}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={data.password}
            required
            onChange={handleChange}
          />
        </div>

        <button className='btn-primary' type='submit'>
          Sign Up
        </button>

        <Link className='authLink' to='/login'>
          Have an accound? Login
        </Link>
      </form>
    </main>
  );
}

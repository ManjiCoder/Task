import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EmployeeContext from '../context/EmployeeContext';
import headersList from '../utils/constant';
export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { setIsAuth } = useContext(EmployeeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let p = fetch('http://localhost:3000/auth/login', {
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
        Cookies.remove('token');
        console.log(err);
        setIsAuth(false);
      });

    toast.promise(p, {
      pending: 'Loading...',
      success: 'Done',
      error: 'Something Went Wrong🤯',
    });
  };
  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
          Login
        </button>

        <Link className='authLink' to='/sign-up'>
          Don't have accound? Sign Up
        </Link>
      </form>
    </main>
  );
}

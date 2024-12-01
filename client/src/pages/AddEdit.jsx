import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../styles/add-edit.module.css';
import config from '../utils/config';
import { departments, headersList, hobbies } from '../utils/constant';

export default function AddEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEdit = state?._id;
  const [data, setData] = useState({
    name: state?.name || '',
    department: state?.department || '',
    address: state?.address || '',
    doj: state?.doj || '',
    gender: state?.gender || '',
    hobbies: state?.hobbies || [],
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'hobbies') {
      const newHobbies = checked
        ? [...new Set([...data.hobbies, value])]
        : data.hobbies.filter((item) => item !== value);
      setData({ ...data, hobbies: newHobbies });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleAddEdit = (e) => {
    e.preventDefault();
    const p = fetch(
      isEdit
        ? `${config.BASE_URL}/employee/${isEdit}`
        : `${config.BASE_URL}/employee`,
      {
        method: isEdit ? 'PATCH' : 'POST',
        body: JSON.stringify(data),
        headers: {
          ...headersList,
          authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((v) => console.log(v));

    toast.promise(p, {
      pending: 'Loading...',
      success: 'Employee saved successfully! 🎉',
      error: 'Failed to save employee. Please try again. 🤯',
    });
  };
  return (
    <main>
      <header className={styles.heading}>
        <Link to='/'>
          <ArrowLeftCircleIcon className={styles.icon} role='button' />
        </Link>
        <h1>Add-Edit Page</h1>
      </header>

      <form>
        <section className={styles.container}>
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
            <label htmlFor='department'>Department:</label>
            <select
              name='department'
              id='department'
              value={data.department}
              onChange={handleChange}
            >
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='address'>Address:</label>
            <textarea
              name='address'
              id='address'
              rows={5}
              placeholder='Enter your address'
              value={data.address}
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label>Gender:</label>
            <div>
              <input
                defaultChecked={data.gender === 'male'}
                onClick={handleChange}
                type='radio'
                name='gender'
                id='male'
                value='male'
              />
              <label htmlFor='male'>Male</label>
            </div>
            <div>
              <input
                defaultChecked={data.gender === 'female'}
                onClick={handleChange}
                type='radio'
                name='gender'
                id='female'
                value='female'
              />
              <label htmlFor='female'>Female</label>
            </div>
          </div>

          <div>
            <label htmlFor='doj'>Date of Joining:</label>
            <input
              type='date'
              name='doj'
              id='doj'
              value={data.doj}
              max={new Date(Date.now() + 60 * 60 * 24 * 1000)
                .toISOString()
                .split('T')[0]
                .split(' ')
                .join('-')}
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Hobbies:</label>
            <div className={styles.hobbies}>
              {hobbies.map((item) => (
                <div key={item}>
                  <input
                    type='checkbox'
                    name={'hobbies'}
                    id={item}
                    checked={data.hobbies.includes(item)}
                    onChange={handleChange}
                    value={item}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.btnContainer}>
          {/* <button className='btn-primary' onClick={handleAddEdit}>
            Update
          </button> */}
          <button className='btn-primary' onClick={handleAddEdit}>
            Save
          </button>
          <button className='btn-primary' onClick={() => navigate('/')}>
            Back
          </button>
        </section>
      </form>
    </main>
  );
}

import React, { useState } from 'react';

export default function AddEdit() {
  const [data, setData] = useState({
    name: '',
    address: '',
    doj: '',
  });

  const departments = [
    '--select',
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Customer Support',
    'Operations',
    'Finance',
    'Human Resources (HR)',
    'Data Analytics',
    'Business Development',
    'Legal',
    'IT & Security',
    'Content',
    'Partnerships',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <main>
      <h1>Add-Edit Page</h1>

      <form>
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
          <select name='department' id='department'>
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

        <div>Gender:</div>
        <div>
          <input type='radio' name='male' id='male' value='male' />
          <label htmlFor='male'>Male</label>
        </div>
        <div>
          <input type='radio' name='female' id='female' value='female' />
          <label htmlFor='female'>Female</label>
        </div>
        <div>
          <label htmlFor='doj'>Date of Joining:</label>
          <input
            type='date'
            name='doj'
            id='doj'
            value={data.doj}
            required
            onChange={handleChange}
          />
        </div>

        <div>Hobbies: </div>
        <div>
          <input type='checkbox' name='hobbie' id='reading' />
          <label htmlFor='reading'>Reading</label>
        </div>
        <div>
          <input type='checkbox' name='hobbie' id='reading' />
          <label htmlFor='reading'>Reading</label>
        </div>
        <div>
          <input type='checkbox' name='hobbie' id='reading' />
          <label htmlFor='reading'>Reading</label>
        </div>
        <div>
          <input type='checkbox' name='hobbie' id='reading' />
          <label htmlFor='reading'>Reading</label>
        </div>
        <button className='btn-primary' type='submit'>
          Login
        </button>
      </form>
    </main>
  );
}

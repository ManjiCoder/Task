import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EmployeeContext from '../context/EmployeeContext';
import config from '../utils/config';
import { headersList } from '../utils/constant';

export default function Home() {
  const { isAuth, setIsAuth } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getEmployees = async () => {
    try {
      const res = await fetch(`${config.BASE_URL}/employee`, {
        headers: {
          ...headersList,
          authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      const data = await res.json();
      console.log(data.data);
      if (data.data) {
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    const p = fetch(`${config.BASE_URL}/employee/${id}`, {
      method: 'DELETE',
      headers: {
        ...headersList,
        authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
      .then((res) => res.json())
      .then((v) => {
        const updatedData = data.filter((v) => v._id !== id);
        setData(updatedData);
        console.log(v);
      });

    toast.promise(request, {
      pending: 'Deleting employee...',
      success: 'Employee deleted successfully! 🎉',
      error: 'Failed to delete employee. Please try again. 🤯',
    });
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const handleLogout = () => {
    if (isAuth) {
      toast.success('Logout Successfully');
      Cookies.remove('token');
      setIsAuth(false);

      setTimeout(() => {
        navigate('/login');
      }, 500);
    }
  };

  return (
    <main>
      <h1>My Company</h1>
      <button onClick={handleLogout} className='authBtn'>
        {isAuth ? 'Logout' : 'Login'}
      </button>

      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={item._id}>
              <td>{++i}</td>
              <td>{item.name}</td>
              <td>{item.department}</td>
              <td>{item.doj}</td>
              <td>{item.gender}</td>
              <td>
                <ul>
                  {item.hobbies.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button className='icon' onClick={() => navigate('/add-edit')}>
                  <PencilSquareIcon />
                </button>
                <button className='icon' onClick={() => handleDelete(item._id)}>
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link role='button' to='/add-edit' className='addIcon'>
        <PlusIcon />
      </Link>
    </main>
  );
}

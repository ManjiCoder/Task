import Cookies from 'js-cookie';
import { useState } from 'react';
import EmployeeContext from './EmployeeContext';

export default function EmployeeState(props) {
  const [isAuth, setIsAuth] = useState(Cookies.get('token') ? true : false);

  return (
    <EmployeeContext.Provider value={{ isAuth, setIsAuth }}>
      {props.children}
    </EmployeeContext.Provider>
  );
}

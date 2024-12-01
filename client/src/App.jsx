import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EmployeeState from './context/EmployeeState';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './routes/ProtectedRoute';

import 'react-toastify/dist/ReactToastify.css';
import AddEdit from './pages/AddEdit';

export default function App() {
  return (
    <EmployeeState>
      <BrowserRouter>
        <Routes>
          {/* Projected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/add-edit' element={<AddEdit />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
        <ToastContainer theme='dark' autoClose={1500} />
      </BrowserRouter>
    </EmployeeState>
  );
}

import { Router } from 'express';
import fetchUser from '../middleware/fetchUser.js';
import isAdnin from '../middleware/isAdmin.js';
import EmployeeModal from '../models/employee.js';
import db from '../utils/dbmySQL.js';
const router = Router();

// Route:1 for employee list => login required
router.get('/', fetchUser, isAdnin, async (req, res) => {
  try {
    // MongoDB query to get all employees
    const [allEmployee] = await db.query('SELECT * FROM employees;');

    // MongoDB query to get all employees
    // const allEmployee = await EmployeeModal.find({});
    res.json({
      data: allEmployee,
    });
  } catch (error) {
    const { message } = error;
    res
      .status(message ? 400 : 500)
      .json({ message: message || 'Internal Server Error' });
  }
});

// Route:2 for employee info => login required
router.get('/:id', fetchUser, isAdnin, async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      // mysqlDB query to find employee
      let [employee] = await db.query(
        `SELECT * FROM employees WHERE _id = ${id}`
      );
      employee = employee[0];

      // MongoDB query to find employee
      // const employee = await EmployeeModal.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'user not found' });
      }
      return res.json(employee);
    }
  } catch (error) {
    const { message } = error;
    res
      .status(message ? 400 : 500)
      .json({ message: message || 'Internal Server Error' });
  }
});

// Route:2 for add employee => login required
router.post('/', fetchUser, isAdnin, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Missing Data' });
  }
  try {
    const { name, department, doj, gender, address, hobbies } = req.body;

    // mysqlDB query to create new employee
    let [employee] = await db.query(`INSERT INTO employees 
      (name, department, doj, gender, address, hobbies) VALUE
      ('${name}','${department}','${doj}','${gender}','${address}','${hobbies}')`);
    employee = await db.query(
      'SELECT * FROM employees WHERE _id = last_insert_id()'
    );
    employee = employee[0];

    // MongoDB query to create new employee
    // const employee = await EmployeeModal.create({
    //   name,
    //   department,
    //   doj,
    //   gender,
    //   address,
    //   hobbies,
    // });
    res.status(201).json({
      message: 'Employee created successfully',
      employee,
    });
  } catch (error) {
    const { message } = error;
    res
      .status(message ? 400 : 500)
      .json({ message: message || 'Internal Server Error' });
  }
});

// Route:3 for update employee => login required
router.patch('/:id', fetchUser, isAdnin, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Missing Data' });
  }
  try {
    const id = req.params.id;
    const employee = await EmployeeModal.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: 'employee not found',
      });
    }

    const { name, department, doj, gender, address, hobbies } = req.body;

    const updatedEmployee = await EmployeeModal.findByIdAndUpdate(
      id,
      { name, department, doj, gender, address, hobbies },
      { new: true }
    );

    res.status(200).json({
      message: 'Employee updated successfully',
      employee: updatedEmployee,
    });
  } catch (error) {
    const { message } = error;
    res
      .status(message ? 400 : 500)
      .json({ message: message || 'Internal Server Error' });
  }
});

// Route:4 for delete employee => login required
router.delete('/:id', fetchUser, isAdnin, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Missing Data' });
  }
  try {
    const id = req.params.id;
    const employee = await EmployeeModal.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: 'employee not found',
      });
    }
    const deletedEmployee = await EmployeeModal.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Employee deleted successfully',
      employee: deletedEmployee,
    });
  } catch (error) {
    const { message } = error;
    res
      .status(message ? 400 : 500)
      .json({ message: message || 'Internal Server Error' });
  }
});
const employeeRoute = router;
export default employeeRoute;

import { model, Schema } from 'mongoose';

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    doj: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    hobbies: { type: Array, default: [] },
  },
  { timestamps: true }
);

const EmployeeModal = model('employee', EmployeeSchema);

export default EmployeeModal;

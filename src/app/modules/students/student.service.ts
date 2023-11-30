import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudents = async (id: string) => {
  const result = await StudentModel.findOne({id});
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudents,
  getSingleStudents,
};

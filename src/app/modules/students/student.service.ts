import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }

  // const result = await Student.create(studentData); // built in static method

  const student = new Student(studentData); // create an instance
  const result = await student.save(); // build in instance method which is provided mongoose

  // if(await student.isUserExist(studentData.id)){
  //   throw new Error('User already exists!')
  // }

  return result;
};

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudents = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudents = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudents,
  getSingleStudents,
  deleteStudents,
};

// step: 4 = query in DB based on model(steps 3)

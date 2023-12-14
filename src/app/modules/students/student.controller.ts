import { Request, Response } from 'express';
import { studentServices } from './student.service';
import StudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { students: studentData } = req.body;
    const zodValidationData = StudentValidationSchema.parse(studentData);
    // will call service function to send this data
    const result = await studentServices.createStudentIntoDb(zodValidationData);

    // console.log({error, value})
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     error: error,
    //   });
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student has created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    });
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudents(studentId);
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    });
  }
};

const deleteStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudents(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudents
};
import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, Student, UserName } from './students/student.interface';

const userSchema = new Schema<UserName>({
    
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String
        },
        lastName: {
            type: {
                type: String,
                require: true
            }
        }

})

const guardianSchema = new Schema<Guardian>(
    {
        fatherName: {
            type: String,
            required: true
        },
        fatherOccupation: {
            type : String
        },
        fatherContactNo: {
            type: String
        },
        motherName: {
            type: String,
            required: true
        },
        motherOccupation:{
            type: String
        },
        motherContactNo: {
            type: String
        }
    }
)

const localGuardianSchema = new Schema<LocalGuardian>(
    {
        name: {
            type: String
        },
        occupation: {
            type: String
        },
        contactNo: {
            type: String
        },
        address: {
            type: String
        }
    }
)

const studentSchema = new Schema<Student>({
    id: {
        type: String
    },
    name: userSchema,
    gender: ['male', 'female'], // enum type
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String
    },
    emergencyContactInfo: {
        type: String,
        required: true
    },
    bloodGroup: ["A", "B", "AB", "O", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // enum type
    presentAddress: {
        type: String
    },
    permanentAddress: {
        type: String
    },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: {
        type: String
    },
    isActive: ['active', 'inactive']
})


export const StudentModel = model<Student>('Student', studentSchema)
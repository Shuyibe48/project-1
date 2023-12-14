import { z } from 'zod';

const UserNameSchema = z.object({
  firstName: z.string()
    .min(1)
    .max(20)
    .refine((value) => value[0] === value[0].toUpperCase(), {
      message: 'First name should start with an uppercase letter',
    }),
  middleName: z.string(),
  lastName: z.string()
});

// Zod schema for Guardian
const GuardianSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string().min(1),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Zod schema for LocalGuardian
const LocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Zod schema for Student
const StudentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: UserNameSchema,
  gender: z.enum(['male', 'female', 'others']),
  email: z.string().email(),
  dateOfBirth: z.string(),
  contactInfo: z.string(),
  emergencyContactInfo: z.string()
    .refine(Boolean, { message: 'Emergency contact information is required' }),
  bloodGroup: z.enum([
    'A',
    'B',
    'AB',
    'O',
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ]),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: z.string().nullable(),
  isActive: z.enum(['active', 'inactive']).default('active'),
  isDeleted: z.boolean(),
});

export default StudentValidationSchema

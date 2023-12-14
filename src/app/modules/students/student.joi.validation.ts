import Joi from 'joi';

const userNameSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(20)
      .trim()
      .regex(/^[A-Z][a-z]*$/, { name: 'capitalize', invert: true })
      .messages({
        'string.base': 'First name must be a string',
        'string.empty': 'First name is required',
        'string.max': 'First name should be at most {#limit} characters',
        'string.pattern.invert.base': 'First name should be in capitalize format',
      }),
    middleName: Joi.string(),
    lastName: Joi.string()
    .required()
    .max(20)
    .trim()
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalize', invert: true })
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name should be at most {#limit} characters',
      'string.pattern.invert.base': 'First name should be in capitalize format',
    }),
  });
  
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'string.empty': 'Father name is required',
    }),
    fatherOccupation: Joi.string(),
    fatherContactNo: Joi.string(),
    motherName: Joi.string().required().messages({
      'string.empty': 'Mother name is required',
    }),
    motherOccupation: Joi.string(),
    motherContactNo: Joi.string(),
  });
  
  const localGuardianSchema = Joi.object({
    name: Joi.string(),
    occupation: Joi.string(),
    contactNo: Joi.string(),
    address: Joi.string(),
  });
  
  const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      'string.empty': 'Student ID is required',
    }),
    name: userNameSchema.required().messages({
      'any.required': 'Student name is required',
    }),
    gender: Joi.string()
      .valid('male', 'female', 'others')
      .required()
      .messages({
        'any.only': '{#value} is not a valid gender',
        'any.required': 'Gender is required',
      }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
    dateOfBirth: Joi.string().required().messages({
      'string.empty': 'Date of Birth is required',
    }),
    contactInfo: Joi.string(),
    emergencyContactInfo: Joi.string().required().messages({
      'string.empty': 'Emergency contact information is required',
    }),
    bloodGroup: Joi.string()
      .valid('A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .messages({
        'any.only': '{#value} is not a valid blood group',
      }),
    presentAddress: Joi.string(),
    permanentAddress: Joi.string(),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'inactive').default('active'),
  });

  export default studentValidationSchema
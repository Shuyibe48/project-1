import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxLength: [20, 'First name should be in 20 characters'],
    trim: true,
    // validate: {
    //     validator: function(value: string){
    //         const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
    //         return firstNameStr === value
    //     },
    //     message: '{VALUE} is not in capitalize format'
    // }
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // validate: {
    //     validator: (value:string)=> validator.isAlpha(value),
    //     message: '{VALUE} is no just Alphabet'
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
  },
  fatherContactNo: {
    type: String,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
  },
  motherContactNo: {
    type: String,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
  },
  occupation: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  address: {
    type: String,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password can not be more then 20 characters'],
    },
    name: {
      type: userSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUE} is not a valid gender!',
      },
      required: [true, 'Gender is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of Birth is required'],
    },
    contactInfo: {
      type: String,
    },
    emergencyContactInfo: {
      type: String,
      required: [true, 'Emergency contact information is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: [
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
        ],
        message: '{VALUE} is not a valid blood group!',
      },
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: {
      type: String,
    },
    isActive: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// pre save middleware/hook

// studentSchema.pre('save', async function (next) {
//   // this mean document
//   // console.log(this, 'pre hook: this will save the data');
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   // To hash a password with bcrypt
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds)
//   );
//   next();
// });

// post save middleware/hook : will work on create() save()

// studentSchema.post('save', function (doc, next) {
//   doc.password = '';
//   // console.log(this, 'post hook: we saved our Data');
//   next();
// });

// query middleware
studentSchema.pre('find', function (next) {
  // this mean current query
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  // this mean current query
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

// step: 2 = Schema
// && step: 3 = Model

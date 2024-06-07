import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    userId: {
      type: String,
    },
    dob: {
      type: String,
    },
    track: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);

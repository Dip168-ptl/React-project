import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: '' },
  pincode: { type: String, required: '' },
  contact: { type: String, required: ''},
  role: { type: String, enum: ['admin', 'restaurantManager', 'deliveryPerson', 'customer']},
  // resetToken: {
  //   type: String, // Token for resetting the password
  //   },
  // resetTokenExpiration: {
  //   type: Date, // Expiration time for the reset token
  // },
  // image: {
  //   type: String, // File path or URL of the user's image
  //   default: '', // Default value (can be a placeholder image URL)
  // },
});

// Middleware to hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


const User = mongoose.model('User', UserSchema);
export default User;


// validate: {
//   validator: function (v) {
//     return /\d{10}/.test(v); // Validates if the contact number has 10 digits
//   },
//   message: props => `${props.value} is not a valid phone number!`
// },
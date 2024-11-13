import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Create the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
    trim: true,   // Remove any leading or trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    lowercase: true, // Convert email to lowercase before saving
    trim: true,   // Remove any leading or trailing spaces
    validate: {
      validator: (v) => /\S+@\S+\.\S+/.test(v), // Basic email regex validation
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Enforce minimum length for the password
  },
});

// Pre-save middleware to hash the password before saving to the database
// userSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//       try {
//         const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
//         this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
//       } catch (err) {
//         return next(err);
//       }
//     }
//     next();
//   });


export default mongoose.model("User", userSchema);

// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: [true, "name is Required"] },
//   email: { type: String, required: [true, "email is Required"] },
//   password: { type: String, required: [true, "password is Required"] },
// });

// const User = new mongoose.model("User", UserSchema);
// export default User;
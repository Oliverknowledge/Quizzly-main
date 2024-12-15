import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
       
        required: true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    profile_picture: {
        type: String,
        default: "/DefaultAvatar.jpeg"
    }
   
})
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
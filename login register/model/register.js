import mongoose from "mongoose";

const registerUser = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                return regex.test(v);
            },
        },
    }
})

export default mongoose.model('register', registerUser)
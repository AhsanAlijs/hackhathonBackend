import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    fatherName: {
        type: String,
        require: true,
    },
    cnicNumber: {
        type: Number,
        require: true,
        length: 13,
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                return regex.test(v);
            },
        }
    },

    rollNo:{
        type:String,
        required:true,
    },
    teacher:{
        type:String,
        required:true,
    }



})

export default mongoose.model("user", userSchema)

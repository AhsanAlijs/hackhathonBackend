import bcrypt from 'bcrypt';
import UserModel from '../models/regester.js';
import { generateToken } from '../middleware/auths.js';




export const register = async (req, res) => {
    try {
        const { email, password, cnicNumber } = req.body;
        const isUserExists = await UserModel.findOne({ cnicNumber });

        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!regex.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.' });
        }

        if (isUserExists) {
            return res.status(409).json({ msg: "Email already in use." });
        }



        let hash = await bcrypt.hash(password, 10);

        let newUser = await UserModel.create({
            ...req.body,
            password: hash
        });


        const token = generateToken(newUser._id)

        return res.status(200).json({ token, uid: newUser._id, message: 'register Successfully!' })

    } catch (error) {
        return res.status(error?.statusCode ?? 500).json({ msg: error?.message ?? "Interal server error." })
    }
}



export const login = async (req, res) => {
    try {
        const { email, password, cnicNumber } = req.body;

        const user = await UserModel.findOne({ cnicNumber: cnicNumber });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const matchPassword = bcrypt.compareSync(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({ msg: "Incorrect Email or Password" })
        }
        const token = generateToken(user._id)

        return res.status(200).json({ message: 'login successfully!', token: token, uid: user._id })

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}






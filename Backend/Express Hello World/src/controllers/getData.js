
import { generateToken } from '../middleware/auths.js';
import UserModel from '../models/regester.js';


export const getData = async (req, res) => {
    const allUserData = await UserModel.find().select(['-password'])
    res.status(200).send(allUserData);
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id).select(['-password']);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send('Internal server error');
    }
};

export const findUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).select(['-password']);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(404).send('user is not found');
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUserData = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(id, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send('Internal server error');
    }
};





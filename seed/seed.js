import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

export const seedAdmin = async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash('tester', salt);

        const user = await User.create({ name: "tester" , password: hashPassword });
        const updatedUser = await User.updateOne({ name: "tester" }, { $push: { roles: 'qa' } });

    } catch (error) {
        console.log(error);
    }
};
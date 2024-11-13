import { hashPassword, comparePassword } from '../../utils/hash.js';
import User from '../users/users.models.js';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        
        const foundUser = await User.findOne({ 
            where: { name }, 
            attributes: ['name', 'passwordHash']
        });

        if (foundUser === null) {
            return res.status(401).json({ error: "Authentication failed"});
        }

        const pswdMatch = await comparePassword(password, foundUser.passwordHash);
        if (!pswdMatch) {
            return res.status(401).json({ error: "Authentication failed"});
        }

        const token = jwt.sign(
            { userId: foundUser.id }, 
            process.env.SECRET_KEY, 
            { expiresIn: "1h"}
        );

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" })
    }
};

export const register = async (req, res) => {
    try {
        const { name, password } = req.body;

        const passwordHash = await hashPassword(password, SALT_ROUNDS);

        const [ _, isCreated ] = await User.findOrCreate({
            where: { name },
            defaults: { passwordHash }
        });
        
        if (!isCreated) {
            return res.status(409).json({ error: "Such a user already exists" });
        }

        res.status(201).json({ message: "User has been registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
    }
};


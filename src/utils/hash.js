import bcrypt from 'bcrypt';

export const hashPassword = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

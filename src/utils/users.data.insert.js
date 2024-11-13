import User from "../entities/users/users.models.js";
import { hashPassword } from "./hash.js";

export const insertUserData = async () => {
    /*
        create() = build() + save()
    */

    const users = await User.bulkCreate([
        {
            name: 'Gaver',
            passwordHash: await hashPassword('123', 10),
        },
        {
            name: 'Lik3r1337',
            passwordHash: await hashPassword('1234', 10),
        },
        {
            name: 'stock',
            passwordHash: await hashPassword('12345', 10),
        },
    ]);
};

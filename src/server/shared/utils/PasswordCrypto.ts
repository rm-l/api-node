import { genSalt, hash, compare } from 'bcryptjs';


const SALT = 8;

const hashPassword = async (password: string) => {

    const generatedSalt = await genSalt(SALT);
    const hashedPassword = await hash(password, generatedSalt);

    return hashedPassword;

};

const verifyPassword = async (password: string, hashedPassword: string) => {

    return await compare(password, hashedPassword);

};

export const PasswordCrypto = {
    hashPassword,
    verifyPassword
};

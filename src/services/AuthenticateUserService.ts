import { getCustomRepository } from "typeorm"
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({ email, password}: IAuthenticateRequest){

        const userRepositories = getCustomRepository(UsersRepositories);

        const user = await userRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect!");
        }

        const token = await sign(
            {
                email: user.email,
            }, 
            "cd4219f963a7ad07cc1b3cda14bce570",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;

    }
}

export { AuthenticateUserService }
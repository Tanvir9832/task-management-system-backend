import { Injectable } from '@nestjs/common';
import { CreateUserDTO, SignUpResponse } from './users.dto';
import * as bcrypt from "bcrypt"
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async signup(payload: CreateUserDTO): Promise<SignUpResponse> {
        //! save the user password encrypted format
        const encryptedPassword = await this.encryptPassword(payload.password, 10)
        payload.password = encryptedPassword;

        //! save the user in the DB
        const response = await this.prisma.user.create({
            data: payload,
            select: {
                id: true,
                email: true,
            }
        })
        //! return email, password
        return response;
    }

    async encryptPassword(password: string, salt: number) {
        console.log(password)
        console.log(bcrypt)
        const encryptedPassword = await bcrypt?.hash(password, salt);
        return encryptedPassword;
    }
}

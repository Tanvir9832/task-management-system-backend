import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO, SignUpResponse } from './users.dto';
import * as bcrypt from "bcrypt"
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async signup(payload: CreateUserDTO): Promise<SignUpResponse> {

        //! Is user exist
        const isUserExists = await this.prisma.user.findFirst({
            where: {
                email: payload.email
            }
        })

        if (isUserExists) {
            throw new BadRequestException('Email is taken', {
                cause: 'user exists',
                description: 'This email has been taken. Try with different email'
            })
        }

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

        return response;
    }

    async encryptPassword(password: string, salt: number) {
        const encryptedPassword = await bcrypt?.hash(password, salt);
        return encryptedPassword;
    }
}

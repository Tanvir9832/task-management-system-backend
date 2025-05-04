import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('/signup')
    async create(@Body() userData: CreateUserDTO) {
        return await this.usersService.signup(userData);
    }

    @Get("/")
    getAllUser() {
        return {}
    }
}

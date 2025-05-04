import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Length(8)
    @IsNotEmpty()
    password: string
}



export interface SignUpResponse {
    id: number,
    email: string,
}
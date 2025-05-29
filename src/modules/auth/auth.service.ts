import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../entities/users.entity";
import { Repository } from "typeorm";
import { CreateUsersDto } from "../users/dtos/CreateUsers.dto";
import { UsersRepository } from "../users/users.repository";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dtos/LoginUserDto.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(Users) private readonly authRepository: Repository<Users>,
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {}

    async createUser(user: CreateUsersDto) {
        return await this.usersRepository.createUser(user);
    } 
    
    async authUser(credentials: LoginUserDto){ 
        const { email, password } = credentials;

        const user = await this.authRepository.findOne({where: { email }, select: ['id', 'password', 'email', 'role']});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Email o password incorrectos. Intente nuevamente');
        }

        const userPayload = { 
            sub: user.id,
            id: user.id,
            email: user.email,
            role: user.role
        };
        
        const token = this.jwtService.sign(userPayload);
       
        return {token};
    }

}
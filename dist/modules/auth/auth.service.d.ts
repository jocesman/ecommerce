import { Users } from "../../entities/users.entity";
import { Repository } from "typeorm";
import { CreateUsersDto } from "../users/dtos/CreateUsers.dto";
import { UsersRepository } from "../users/users.repository";
import { LoginUserDto } from "./dtos/LoginUserDto.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly authRepository;
    private readonly usersRepository;
    private readonly jwtService;
    constructor(authRepository: Repository<Users>, usersRepository: UsersRepository, jwtService: JwtService);
    createUser(user: CreateUsersDto): Promise<string | Omit<CreateUsersDto, "password">>;
    authUser(credentials: LoginUserDto): Promise<{
        token: string;
    }>;
}

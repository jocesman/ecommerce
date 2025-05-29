import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/LoginUserDto.dto";
import { CreateUsersDto } from "../users/dtos/CreateUsers.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(user: CreateUsersDto): Promise<string | Omit<CreateUsersDto, "password">>;
    authUser(credentials: LoginUserDto): Promise<{
        token: string;
    }>;
}

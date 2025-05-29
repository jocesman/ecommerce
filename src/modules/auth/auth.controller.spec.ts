import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/LoginUserDto.dto";
import { CreateUsersDto } from "../users/dtos/CreateUsers.dto";
import { Role } from "../../roles.enum";
import { Users } from "../../entities/users.entity";

const mockUser: LoginUserDto = {
    email: 'john.doe@example.com',
    password: 'Asdf1234%',
}

const mockUser2: CreateUsersDto = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'Asdf1234%',
    phone: '+1 (555) 555-5555',
    country: 'United States',
    address: '123 Main St',
    city: 'New York',
    role: Role.User,
};

describe('AuthController', () => {

    let authController: AuthController;
    let mockAuthService: AuthService;

    beforeEach( async () => {

        mockAuthService = {
            createUser: (mockUser2) => Promise.resolve({ ...mockUser2, id: '1234fs-5678qw-9012ew-3456tr' } as Users),
            authUser: (mockUser) => Promise.resolve({ token: 'mock-jwt-token' }),
        } as unknown as jest.Mocked<AuthService>;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
      
    });

  it('Debe estar definido', async () => {
    expect(authController).toBeDefined();
  });

  it('Debe devolver un token de autenticación', async () => {
    const result = await authController.authUser(mockUser);
    expect(result).toEqual({ token: 'mock-jwt-token' });
  });

  it ('Debe crear un usuario', async () => {
    const result = await authController.createUser(mockUser2);
    expect(result).toEqual({ ...mockUser2, id: '1234fs-5678qw-9012ew-3456tr' });
  });

});
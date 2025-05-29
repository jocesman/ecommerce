import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { UsersRepository } from '../users/users.repository';
import { Repository } from 'typeorm';
import { CreateUsersDto } from '../users/dtos/CreateUsers.dto';
import { Role } from '../../roles.enum';
import { LoginUserDto } from './dtos/LoginUserDto.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Mock de bcrypt para controlar su comportamiento en los tests
jest.mock('bcrypt', () => ({
    compare: jest.fn()
}));

describe('AuthService', () => {
    let authService: AuthService;
    let mockTypeOrmRepository: Partial<Repository<Users>>;
    let jwtService: JwtService;

    const mockAuthUser: LoginUserDto = {
        email: 'john.doe@example.com',
        password: 'Asdf1234%',
    };

    const mockUser: CreateUsersDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'Asdf1234%',
        phone: '+1 (555) 555-5555',
        country: 'United States',
        address: '123 Main St',
        city: 'New York',
        role: Role.User,
    };

    beforeEach(async () => {
        const mockUsersRepository: Partial<UsersRepository> = {
            createUser: (user: CreateUsersDto): Promise<string | Omit<CreateUsersDto, "password">> => 
                Promise.resolve({
                    ...user,
                    isAdmin: false,
                    id: '1234fs-5678qw-9012ew-3456tr',
                }),
        };
    
        mockTypeOrmRepository = {
            findOne: jest.fn().mockResolvedValue(null), 
        };

        jwtService = {
            sign: jest.fn().mockReturnValue('mock-jwt-token'),
        } as unknown as JwtService;

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: jwtService,
                },
                {
                    provide: UsersRepository,
                    useValue: mockUsersRepository,
                },
                {
                    provide: getRepositoryToken(Users),
                    useValue: mockTypeOrmRepository,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('Crear una instancia de AuthService', async () => {
        expect(authService).toBeDefined();
    });
    
    it('Signup - Crear un nuevo usuario', async () => {
        const result = await authService.createUser(mockUser);
        expect(result).toEqual({
            ...mockUser,
            isAdmin: false,
            id: '1234fs-5678qw-9012ew-3456tr',
        });
    });
    
    it('Signin - Debe lanzar Exception cuando el email no corresponde a ningún usuario', async () => {
        // Aseguramos que findOne devuelve null (simulando que no existe el usuario)
        jest.spyOn(mockTypeOrmRepository, 'findOne').mockResolvedValue(null);
        
        // Verificamos que se lanza la excepción correcta
        await expect(authService.authUser(mockAuthUser)).rejects.toThrow(
            new UnauthorizedException('Email o password incorrectos. Intente nuevamente')
        );
        
    });

    it('Signin - Debe lanzar excepción si el email coincide pero la contraseña es incorrecta', async () => {
        // Usuario mock con email correcto
        const mockUserFound = {
            id: '1234fs-5678qw-9012ew-3456tr',
            email: mockAuthUser.email,
            password: 'hashed-password-in-db',
            role: Role.User
        } as Users;
    
        // Mock de findOne que devuelve usuario solo si el email coincide
        jest.spyOn(mockTypeOrmRepository, 'findOne').mockImplementation(async (options: any) => {
            const email = mockAuthUser.email;
            if (email === mockUserFound.email) {
                return mockUserFound;
            }
            return null;
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(false)

        await expect(authService.authUser(mockUserFound)).rejects.toThrow(
            new UnauthorizedException('Email o password incorrectos. Intente nuevamente')
        );
        // // Si email coincide simulamos bcrypt.compare false (contraseña incorrecta)
        // (bcrypt.compare as jest.Mock).mockResolvedValue(false)
        
        // //"Email o password incorrectos. Intente nuevamente"));
        // await expect(authService.authUser(mockAuthUser)).rejects.toThrowError(
        //     new UnauthorizedException('Email o password incorrectos. Intente nuevamente')
        // );
       
    });
    

    

});
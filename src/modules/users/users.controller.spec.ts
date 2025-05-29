import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Role } from "../../roles.enum";
import { Users } from "../../entities/users.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateUsersDto } from "./dtos/CreateUsers.dto";

const mockUsers: Users[] = [
    {
        id: '1234fs-5678qw-9012ew-3456tr',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 555-5555',
        password: 'Asdf1234%',
        country: 'United States',
        address: '123 Main St',
        city: 'New York',
        role: Role.User,
        orders: [],
    },
    {
        id: '1345fs-8978qw-9012ew-3456tr',
        name: 'Ana Polenta',
        email: 'ana.polenta@example.com',
        phone: '+1 (555) 555-5555',
        password: 'Asdf1234%',
        country: 'United States',
        address: '123 Main St',
        city: 'New York',
        role: Role.User,
        orders: [],
    },
];

describe ('UsersController', () => {

    let usersController: UsersController;
    let mockUsersService: UsersService;

    beforeEach( async () => {
        
        mockUsersService = {
            getUsers: () => Promise.resolve([]),
            getUsersById: (id: string) => Promise.resolve(mockUsers[0]),
            deleteUser: (id: string) => Promise.resolve('User deleted successfully'),
            updateUser: (id: string, mockUser: CreateUsersDto) => Promise.resolve(mockUsers[0]),
        } as unknown as jest.Mocked<UsersService>;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                { provide: JwtService, useValue: {} }
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
      
    });

    it('Debe estar definido', async () => {
        expect(usersController).toBeDefined();
    });

    it('Debe devolver un array de usuarios', async () => {
        const result = await usersController.getUsers();
        expect(result).toEqual([]);
    });

    it('Debe devolver un usuario por ID', async () => {
        const result = await usersController.getUsersById('1234fs-5678qw-9012ew-3456tr');
        expect(result).toEqual(
            {
                id: '1234fs-5678qw-9012ew-3456tr',
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1 (555) 555-5555',
                password: 'Asdf1234%',
                country: 'United States',
                address: '123 Main St',
                city: 'New York',
                role: Role.User,
                orders: [],
            }
        );
    });

    it ('Debe eliminar un usuario por ID', async () => {
        const result = await usersController.deleteUser('1234fs-5678qw-9012ew-3456tr');
        expect(result).toEqual('User deleted successfully');
    });

    it('Debe actualizar un usuario por ID', async () => {
        const result = await usersController.updateUser('1234fs-5678qw-9012ew-3456tr', mockUsers[0]);
        expect(result).toEqual(mockUsers[0]);
    });

});

    
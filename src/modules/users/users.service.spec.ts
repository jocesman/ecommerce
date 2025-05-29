import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../../entities/users.entity';
import { Role } from '../../roles.enum';

const mockUsers : Omit<Users, 'password'>[] = [ 
    { 
        id: '1234fs-5678qw-9012ew-3456tr',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 555-5555',
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
        country: 'United States',
        address: '123 Main St',
        city: 'New York',
        role: Role.User,
        orders: [],
    },
];

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: jest.Mocked<UsersRepository>;

  const mockUsersRepository = {
    getUsers: jest.fn(),
    getUsersById: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
  } as unknown as jest.Mocked<UsersRepository>;

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(UsersRepository);
  });

  it('Servicio está definido', async () => {
    expect(service).toBeDefined();
  });

  it('GetUsers debe devolver un array de usuarios', async () => {
    const result = mockUsers;
    usersRepository.getUsers.mockResolvedValue(result);

    const users = await service.getUsers();
    expect(users).toEqual(result);
    // expect(usersRepository.getUsers).toHaveBeenCalled();
  });

  it('debe retornar un usuario por ID', async () => {
    const user = mockUsers[1];
    
    usersRepository.getUsersById.mockResolvedValue(user);

    const result = await service.getUsersById('1234fs-5678qw-9012ew-3456tr');
    expect(result).toEqual(user);
    expect(usersRepository.getUsersById).toHaveBeenCalledWith('1234fs-5678qw-9012ew-3456tr');
  });

  it ('debe eliminar un usuario por ID', async () => {
    const user: any = mockUsers[1];
    
    usersRepository.deleteUser.mockResolvedValue(user);

    const result = await service.deleteUser('1234fs-5678qw-9012ew-3456tr');
    expect(result).toEqual(user);
    expect(usersRepository.deleteUser).toHaveBeenCalledWith('1234fs-5678qw-9012ew-3456tr');
  });

  it('debe actualizar un usuario por ID', async () => {
    const user: any = mockUsers[1];
    
    usersRepository.updateUser.mockResolvedValue(user);

    const result = await service.updateUser('1234fs-5678qw-9012ew-3456tr', user);
    expect(result).toEqual(user);
    expect(usersRepository.updateUser).toHaveBeenCalledWith('1234fs-5678qw-9012ew-3456tr', user);
  });

    
});






// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';
// import { Repository } from 'typeorm';
// import { Users } from '../../entities/users.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { UsersRepository } from './users.repository';
// import { Role } from '../../roles.enum';


// describe('UsersService', () => {
//     let service: UsersService;
//     let mockTypeOrmRepository: Partial<Repository<Users>>;

//     mockTypeOrmRepository = {
//         findOne: jest.fn().mockResolvedValue(null), 
//     };

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 UsersRepository,
//                 UsersService,
//                 {
//                     provide: getRepositoryToken(Users),
//                     useValue: mockTypeOrmRepository
//                 },
//                 // {
//                 //     provide: UsersRepository,
//                 //     useValue: {
//                 //         getUsers: jest.fn().mockResolvedValue([
//                 //             {
//                 //                 id: '1234fs-5678qw-9012ew-3456tr',
//                 //                 name: 'John Doe',
//                 //                 email: 'john.doe@example.com',
//                 //                 phone: '+1 (555) 555-5555',
//                 //                 country: 'United States',
//                 //                 address: '123 Main St',
//                 //                 city: 'New York',
//                 //                 role: 'user',
//                 //             }
//                 //           ]),
//                 //       findOne: jest.fn(),
//                 //       save: jest.fn(),
//                 //       // etc.
//                 //     },
//                 // },
//             ],
//         }).compile();

//         service = module.get<UsersService>(UsersService);
//     });

//     it('Servicio está definido', async () => {
//         expect(service).toBeDefined();
//     });

//     it('getUsers debe devolver un array de usuarios', async () => {
//         const mockusers  = [
//             {
//                 id: '1234fs-5678qw-9012ew-3456tr',
//                 name: 'John Doe',
//                 email: 'john.doe@example.com',
//                 phone: '+1 (555) 555-5555',
//                 country: 'United States',
//                 password: 'hashedpassword',
//                 address: '123 Main St',
//                 city: 'New York',
//                 role: Role.User,
//                 orders: [],
//             },
//         ];
//         jest.spyOn(mockTypeOrmRepository, 'find').mockResolvedValue(mockusers);
//         // mockTypeOrmRepository.find = jest.fn().mockResolvedValue(mockusers);
//         const result = await service.getUsers();
//         expect(result).toEqual(mockusers); 
//     });


// });

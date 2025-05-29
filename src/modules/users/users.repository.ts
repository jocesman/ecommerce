import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Users } from "../../entities/users.entity";
import { CreateUsersDto } from "./dtos/CreateUsers.dto";
import { UpdateUsersDto } from "./dtos/UpdateUsers.dto";
import * as bcrypt from 'bcrypt';

@Injectable ()
export class UsersRepository { 

    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>
    ) {}
    
    async getUsers(): Promise<Omit<Users, "password">[]> {
        const users = await this.usersRepository.find();
        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user; // Excluir el campo 'password'
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    }
    
    async getUsersById(id: string): Promise<string | Omit<Users, 'password'>> {
        
        const user = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'],
            relations: ['orders']//, 'orders.orderDetails', 'orders.orderDetails.products']
          });
        if (user) return user;
        return 'User not found';
    }

    async createUser(users: CreateUsersDto): Promise<string | Omit<CreateUsersDto, "password">> {
        const existe = await this.usersRepository.findOne({
            where: { email: users.email }
        });
        if (existe) {
            throw new BadRequestException('Este email ya está en uso');
        }
        const hashedPassword = await bcrypt.hash(users.password, 10);
        if (!hashedPassword) {
            throw new BadRequestException('Error al tratar de crear el usuario. Intente nuevamente');
        }
        
        await this.usersRepository.save({ ...users, password: hashedPassword, fecnac: new Date(users.fecnac) });

        const { password, ...userWithoutPassword } = users;
        return userWithoutPassword;
    }

    async updateUser(id: string, user: UpdateUsersDto): Promise<string> {
        if (!isUUID(id)) {
            throw new BadRequestException('El ID debe ser válido');
        }
        const userUpDated = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'],
          });
        try {
            if (userUpDated) {
                if (user.email !== undefined) userUpDated.email = user.email;
                if (user.name !== undefined) userUpDated.name = user.name;
                if (user.address !== undefined) userUpDated.address = user.address;
                if (user.phone !== undefined) userUpDated.phone = user.phone;
                if (user.country !== undefined) userUpDated.country = user.country;
                if (user.city !== undefined) userUpDated.city = user.city;
                await this.usersRepository.save(userUpDated);   
                return 'User updated successfully';
            }
        } catch (error) {
            throw new BadRequestException('Error, el email que está tratando de actualizar está en uso en otra cuenta, favor de intente con otro email o deje el email actual');
        }
        
        return 'User not found';

    }

    async deleteUser(id: string): Promise<string> {
        
        const result = await this.usersRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return 'User deleted successfully';
    }
}
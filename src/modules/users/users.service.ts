import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUsersDto } from "./dtos/CreateUsers.dto";
import { UpdateUsersDto } from "./dtos/UpdateUsers.dto";

@Injectable()
export class UsersService {
    
    constructor(private usersRepository: UsersRepository) {}  

    getUsers(){
        return this.usersRepository.getUsers();
    }

    getUsersById(id: string) {
        return this.usersRepository.getUsersById(id);
    }

    createUser(user: CreateUsersDto) {
        return this.usersRepository.createUser(user);
    }
    
    updateUser(id: string, user: UpdateUsersDto) {
        return this.usersRepository.updateUser(id, user);
    }

    deleteUser(id: string) {
       return this.usersRepository.deleteUser(id); 
    }
    
    
}
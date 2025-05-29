"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const users_entity_1 = require("../../entities/users.entity");
const bcrypt = require("bcrypt");
let UsersRepository = class UsersRepository {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers() {
        const users = await this.usersRepository.find();
        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    }
    async getUsersById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'],
            relations: ['orders']
        });
        if (user)
            return user;
        return 'User not found';
    }
    async createUser(users) {
        const existe = await this.usersRepository.findOne({
            where: { email: users.email }
        });
        if (existe) {
            throw new common_1.BadRequestException('Este email ya está en uso');
        }
        const hashedPassword = await bcrypt.hash(users.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Error al tratar de crear el usuario. Intente nuevamente');
        }
        await this.usersRepository.save({ ...users, password: hashedPassword, fecnac: new Date(users.fecnac) });
        const { password, ...userWithoutPassword } = users;
        return userWithoutPassword;
    }
    async updateUser(id, user) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('El ID debe ser válido');
        }
        const userUpDated = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'],
        });
        try {
            if (userUpDated) {
                if (user.email !== undefined)
                    userUpDated.email = user.email;
                if (user.name !== undefined)
                    userUpDated.name = user.name;
                if (user.address !== undefined)
                    userUpDated.address = user.address;
                if (user.phone !== undefined)
                    userUpDated.phone = user.phone;
                if (user.country !== undefined)
                    userUpDated.country = user.country;
                if (user.city !== undefined)
                    userUpDated.city = user.city;
                await this.usersRepository.save(userUpDated);
                return 'User updated successfully';
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Error, el email que está tratando de actualizar está en uso en otra cuenta, favor de intente con otro email o deje el email actual');
        }
        return 'User not found';
    }
    async deleteUser(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return 'User deleted successfully';
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map
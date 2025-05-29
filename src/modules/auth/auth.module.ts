import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../entities/users.entity";
import { UsersModule } from "../users/users.module";

@Module({
    imports : [
        TypeOrmModule.forFeature([Users]),
        UsersModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
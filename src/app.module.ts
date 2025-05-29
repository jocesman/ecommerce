import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FilesModule } from './modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }), 
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService):any=>
        configService.get('typeorm')
  }),
    
    UsersModule, 
    ProductModule, 
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FilesModule,  
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET
    }),
  ],
  providers: [],
})
export class AppModule {} 

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CreateUsersDto } from './../src/modules/users/dtos/CreateUsers.dto';
import { Role } from "../src/roles.enum";
import { Repository } from 'typeorm';
import { Users } from '../src/entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryDto } from '../src/modules/categories/dtos/Category.dto';
import { Categories } from '../src/entities/categories.entity';
import { OrderDto } from 'src/modules/orders/orders.Dto';
import { CreateOrdersDto } from 'src/modules/orders/dtos/CreateOrders.dto';

const mockUser: CreateUsersDto  = {
  name: 'test',
  email: 'test3@gmail.com',
  password: 'Asdf1234%',
  phone: '+1 (555) 555-5555',
  country: 'United States',
  address: '123 Main St',
  city: 'New York',
  role: Role.User,
};

const mockUser2: CreateUsersDto  = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'Asdf1234%',
  phone: '+1 (555) 555-5555',
  country: 'United States',
  address: '123 Main St',
  city: 'New York',
  role: Role.User,
};

const mockCategory:CategoryDto  = {
  name: 'Newcategory',
};

const mockOrders: CreateOrdersDto = {
    id: "61abc42b-b658-4575-be7b-2d24155f12f2",
  orderDetails: [
    { "productId": "8f34d989-c4b9-4136-821f-41f678f0516c" },
    { "productId": "33c8c7dc-9c7e-40ce-8860-147d99ab0164" },
		{ "productId": "368fc40a-603f-44d0-8f5d-74da93db69b8" }
  ]
}

describe('AppController (e2e)', () => {

  let app: INestApplication<App>;
  let userRepo: Repository<Users>;
  let categoryRepo: Repository<CategoryDto>;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Inyecta aquí el repositorio de User
    userRepo = moduleFixture.get<Repository<Users>>(getRepositoryToken(Users));
    categoryRepo = moduleFixture.get<Repository<Categories>>(getRepositoryToken(Categories));
    
    // Suponiendo que tienes un endpoint /auth/login
    const loginResponse = await request(app.getHttpServer())
                .post('/auth/signin')
                .send({ email: 'luis@gmail.com', password: 'Asdf1234%' });
    
    token = loginResponse.body.token; // O el campo correcto        
    
  });
    
  afterAll(async () => {
    await app.close();
  });

  it('GET /users - Debería devolver una lista de usuarios', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
      console.log('Response body:', req.body);
      expect(req.status).toBe(200);
      expect(req.body).toBeInstanceOf(Object);
  });
  
  it('GET /users/:id - Debería devolver un usuario por ID', async () => {
    const userId = '7c92d5dc-b9b7-480a-81d2-7ec843047a94'; // Cambia esto por un ID de usuario válido
    const req = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    console.log('Response body:', req.body);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
    expect(req.body.id).toBe(userId);
    expect(req.body).toHaveProperty('name');
    expect(req.body).toHaveProperty('email');
    expect(req.headers['content-type']).toEqual(expect.stringContaining('json'));
  });

  it('GET /users/:id - Verifica que el ID es UUID válido', async () => {
    const userId = 'no-es-uuid'; // Cambia esto por un ID de usuario válido
    const req = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    console.log('Response body:', req.body);
    expect(req.status).toBe(400);
    expect(req.body.message).toContain('Validation failed (uuid is expected)');
  });

  it('POST /signup - Debería crear un nuevo usuario', async () => {
    //Borra cualquier usuario con ese email
    await userRepo.delete({ email: mockUser.email });
    const req = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockUser)
    
      console.log('Response body:', req.body);
      expect(req.status).toBe(201);
      expect(req.body).toBeInstanceOf(Object);
  });

  it('POST /signup - Verifica que el email está en uso', async () => {
    //Borra cualquier usuario con ese email
    mockUser.email = 'jose@gmail.com';
    const req = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockUser)
    
      console.log('Response body:', req.body);
      expect(req.status).toBe(400);
      expect(req.body.message).toContain('Este email ya está en uso');
  });

  it('PUT /users/:id - Debería actualizar un usuario', async () => {
    const userId = '61abc42b-b658-4575-be7b-2d24155f12f2'; // Cambia esto por un ID de usuario válido
    const updatedUser = { ...mockUser2, name: 'Updated Name' };
    const req = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser);
    console.log('Response body:', req.body);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Products - Debería devolver una lista de productos', async () => {
    const req = await request(app.getHttpServer())
      .get('/products')
    console.log('Response body:', req.body);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Products - Debería devolver un producto por ID', async () => {
    const productId = '500f96a0-1df3-4366-834d-d3019ed74bfd'; // Cambia esto por un ID de producto válido
    const req = await request(app.getHttpServer())
      .get(`/products/${productId}`)
    console.log('Response body:', req.body);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
    expect(req.body.id).toBe(productId);
  });

  it('Categorias - Debería devolver una lista de categorias', async () => {
    const req = await request(app.getHttpServer())
      .get('/categories')
      .set('Authorization', `Basic:a:a`)
    console.log('Response body:', req.body);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Categorias - Adicionar una categoria', async () => {
    //Borra cualquier categoria
    await categoryRepo.delete({name:mockCategory.name});
    const req = await request(app.getHttpServer())
      .post('/categories/addCategory')
      .set('Authorization', `Basic:a:a`)
      .send(mockCategory)
    console.log('Response body:', req.body);
    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object); 
  });

  it('Orders - Crear una orden', async () => {
    const req = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(mockOrders)
    console.log('Response body:', req.body);
    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object); 
  });

  it('Orders - Obtener una orden por ID', async () => {
    const orderId = 'e7afbee1-990b-4723-8fac-3ec7d85c5602'; 
    const req = await request(app.getHttpServer())
      .get(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
    console.log('Response body:', req.body);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });
      
});

import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from "@nestjs/config";

// Cargar variables de entorno desde el archivo .env
dotenvConfig({ path: 'test/.env.development' });
// dotenvConfig();


const config = {
  type: 'postgres', 
  database: process.env.DB_NAME, 
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT as unknown as number, 
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  autoLoadEntities: true, 
  synchronize: true, 
  logging: false,  
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}']
};

// Exportar la configuración usando `registerAs` de NestJS para inyectarlo como un servicio
export default registerAs('typeorm', () => config);

// Crear y exportar la conexión de datos
export const connectionSource = new DataSource(config as DataSourceOptions);

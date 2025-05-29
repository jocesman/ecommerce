import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>(); 
    
    // Verificar si existe el header Authorization
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Header de autorización no encontrado');
    }
    
    // Verificar que tenga la estructura correcta
    const isBasicAuth = authHeader.startsWith('Basic:');
    if (!isBasicAuth) {
      throw new UnauthorizedException('El header debe comenzar con "Basic:"');
    }
    
    // Extraer email y password
    const authValue = authHeader.slice(6).trim(); // Quitar "Basic:" y espacios
    const hasCorrectFormat = authValue.includes(':');
    if (!hasCorrectFormat) {
      throw new UnauthorizedException('Formato incorrecto. Debe ser "Basic: <email>:<password>"');
    }
    
    const [email, password] = authValue.split(':');
    
    // Verificar que tanto email como password estén presentes
    if (!email || !password) {
      throw new UnauthorizedException('Email o password incorrectos');
    }
    
    return true  //Existe el header Authorization
  }
}
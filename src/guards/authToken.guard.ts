import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthTokenGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;
        if (!authHeader) {
         throw new UnauthorizedException('Header de autorización no encontrado');
        }
        
        // Verificar que tenga la estructura correcta
        const isBasicAuth = authHeader.startsWith('Bearer ');
        if (!isBasicAuth) {
        throw new UnauthorizedException('Bearer token no válido (Formato incorrecto)');
        }

        // Obtener el token del header Authorization
        const token = request.headers.authorization?.split(' ')[1];

        // Verificar si existe el header Authorization
        if (!token) {
            throw new UnauthorizedException('Header de autorización no encontrado');
        }

        // Verificar que el token sea válido
        try {
            const secret = process.env.JWT_SECRET;
            const payload = await this.jwtService.verify(token, { secret });
            payload.iat = new Date(payload.iat * 1000).toLocaleString(); // Convertir a fecha legible
            payload.exp = new Date(payload.exp * 1000).toLocaleString(); // Convertir a fecha legible
            request.user = payload; // Guardar el payload en el request para usarlo en el controlador
            return true; // Token válido, permitir el acceso
        } catch (error) {
            throw new UnauthorizedException('Bearer token no válido- ' + error);
        }
        
    }}
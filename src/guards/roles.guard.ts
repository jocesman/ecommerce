import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) {
            return true; // No se requiere rol específico
        }

        const request = context.switchToHttp().getRequest(); 
        const userRoles: Role[] = Array.isArray(request.user.role) ? request.user.role : [request.user.role];

        const hasRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
            throw new ForbiddenException('No tiene los permisos necesarios');
        }   

        return true;
    }
}

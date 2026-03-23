import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: (allowedRoles: string[]) => CanActivateFn = (allowedRoles: string[]) => {
    return () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        const role = authService.getRole();

        if (role && allowedRoles.includes(role)) {
            return true;
        }

        // Si no tiene el rol, redirige a home o muestra error
        alert('No tienes permisos para acceder a esta ruta');
        router.navigate(['/home']);
        return false;
    };
};

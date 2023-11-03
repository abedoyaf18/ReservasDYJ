import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // El usuario está autenticado y puede acceder a la ruta
    } else {
      // El usuario no está autenticado, redirige al componente de inicio de sesión
      this.router.navigate(['/login']);
      return false; // No permite el acceso a la ruta
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/authenticate';
  private token: string | null = null;
  private inactivityTimeout: any;

  constructor(private http: HttpClient, private router: Router) {
    // Registra el evento onBeforeUnload para limpiar el token al salir de la página
    window.onbeforeunload = () => {
      this.clearToken();
    };
  }

  login(datos: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, datos).pipe(
      tap(response => {
        // Aquí obtienes el token de la respuesta de la API
        const token = response.token;
        
        // Guardas el token en el servicio
        this.setToken(token);
      })
    );
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token); // Guardas el token en el localStorage
    this.resetInactivityTimer
  }
  
  getToken(): string | null {
    if (this.token) {
      return this.token;
    }
    return localStorage.getItem('access_token');
  }  

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  initInactivityTimer(): void {
    window.addEventListener('mousemove', this.resetInactivityTimer.bind(this));
    window.addEventListener('scroll', this.resetInactivityTimer.bind(this));
    window.addEventListener('keypress', this.resetInactivityTimer.bind(this));
  }

  resetInactivityTimer(): void {
    // Reiniciar el temporizador de inactividad al detectar una actividad
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      // Limpiar el token de acceso después de 2 minutos de inactividad
      this.logout();
    }, 6000); // 6 segundos en milisegundos
  }
}
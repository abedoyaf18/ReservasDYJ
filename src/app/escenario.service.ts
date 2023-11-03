import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { map } from 'rxjs';
import { Escenario } from './escenario';

@Injectable({
  providedIn: 'root'
})
export class EscenarioService {
  private apiUrl = '/api/v1/product/all';
  private EscenarioUrl = '/api/v1/Escenario';

  constructor(private http: HttpClient) {}

  quantityToAdd(quantity: any): number {
    let quantityToAdd = parseInt(quantity, 10);
    
    // Verificar si el valor ingresado es un número válido
    if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
      // Si no es un número válido o es negativo, establecer el valor predeterminado como 1
      quantityToAdd = 1;
    }
    
    return quantityToAdd;
  }

  getEscenarios(): Observable<Escenario[]> {
    // Obtener el token almacenado en el almacenamiento local
    const token = localStorage.getItem('access_token');
    
    // Configurar el encabezado Authorization con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizar la solicitud HTTP con el encabezado configurado
    return this.http.get<Escenario[]>(this.apiUrl, { headers }).pipe(
      map(escenario => {
        return escenario.map(escenario => {
          return {
            id: escenario.id,
            nombre: escenario.nombre,
            fecha: escenario.fecha,
            hora: escenario.hora
          };
        });
      })
    );
  }

  addEscenario(newEscenario: Escenario): Observable<any> {
    const token = localStorage.getItem('access_token');
  
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.post(this.EscenarioUrl, newEscenario, { headers });
    } else {
      console.error('No se encontró un token de acceso válido en el localStorage');
      return throwError('No se encontró un token de acceso válido en el localStorage');
    }
  }
}


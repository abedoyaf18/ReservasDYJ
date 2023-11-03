import { Component, Output, EventEmitter } from '@angular/core';
import { Escenario } from '../escenario';
import { EscenarioService } from '../escenario.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  newEscenarioId?: number;
  newEscenarioName: string = '';
  newEscenarioDate: string = '';
  newEscenarioTime: string = '';

  @Output() cerrarVentana = new EventEmitter();

  constructor(private escenarioService: EscenarioService) {}
  addEscenario() {
    const token = localStorage.getItem('access_token');

    if (token) {
      const newEscenario: Escenario = {
        nombre: this.newEscenarioName,
        fecha: this.newEscenarioDate,
        hora: this.newEscenarioTime
      };
    
      console.log('Cuerpo de la solicitud:', newEscenario);
    
      this.escenarioService.addEscenario(newEscenario).subscribe(
        (response: any) => {
          console.log('Escenario agregado exitosamente:', response);
          alert('El Escenario ha sido creado exitosamente');
          this.cerrarVentana.emit();
        },
        (error: any) => {
          console.error('Error al agregar el Escenario:', error);
        }
      );
    }
  }
  
  cerrarAgregar() {
    this.cerrarVentana.emit();
  }
} 

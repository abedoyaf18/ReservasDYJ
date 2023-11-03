import { Component } from '@angular/core';
import { EscenarioService } from '../escenario.service';
import { Escenario } from '../escenario';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AgregarComponent } from '../agregar/agregar.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  searchTerm: string = '';
  filterOption: string = 'nombre';
  escenario: Escenario[] = [];
  filteredEscenario: Escenario[] = [];
  nombreFiltro: string = '';
  ordenCantidad: boolean = false;
  mostrarVentanaEscenarioEmergente: boolean = false;
  newEscenarioName: string = '';
  newEscenarioDate: string = '';
  newEscenarioTime: string = '';
  date : Date = new Date();

  constructor(private EscenarioService: EscenarioService,private httpClient: HttpClient){

  }

  abrirAddEscenarioDialog(){
    this.mostrarVentanaEscenarioEmergente = true;
  }

  cerrarAddEscenarioDialog(){
    this.mostrarVentanaEscenarioEmergente = true;
  }

  searchEscenario(){
    this.applyFilters();
  }

  getEscenarioQuant(escenario: Escenario) {
    return escenario.nombre;
  }

  applyFilters() {
    this.filteredEscenario = this.escenario.filter(escenario =>
      (escenario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      escenario.fecha.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.nombreFiltro || escenario.nombre.toLowerCase().startsWith(this.nombreFiltro.toLowerCase()))
    );

    if (this.filterOption === 'nombre') {
      this.filteredEscenario.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } 
  }

  ngOnInit() {
    //this.loadProductData();
  }

}

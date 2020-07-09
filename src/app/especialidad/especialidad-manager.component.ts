import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { Especialidad } from '../models/especialidad.model';
import { Router } from '@angular/router';
import { EspecialidadHttpService } from '../services/especialidad-http.service';

@Component({
  selector: 'app-especialidad-manager',
  templateUrl: './especialidad-manager.component.html',
  styleUrls: ['./especialidad-manager.component.scss']
})
export class EspecialidadManagerComponent implements OnInit {

   especialidades: Especialidad [];
   especialidadSeleccionada: Especialidad;
 
   constructor(
     private especialidadesData: EspecialidadHttpService,//ConsejeriaArrayService,
     private router: Router,
     private stateService: StateService
   ) { }
 
   ngOnInit() {
     this.especialidadesData.getAll();
     this.stateService.especialidades$.subscribe(especialidades => this.especialidades = especialidades);
     this.stateService.setAppTitulo('Administracion de Especialidades');
   }
 
   filtrarEspecialidad(filtro: string) {
     this.especialidadesData.filterByNombreApellido(filtro).subscribe(especialidades => this.especialidades = especialidades);
   }
 
   seleccionarEspecialidad(especialidad: Especialidad) {
     this.router.navigate(['especialidades', especialidad.id.toString()]);
   }
 
   cancelarEdicion() {
     this.especialidadSeleccionada = null;
   }
 
   nuevaEspecialidad(){
     this.router.navigate(['especialidades', '']);
   }

}

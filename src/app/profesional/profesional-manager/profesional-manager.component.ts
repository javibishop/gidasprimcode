import { Component, OnInit } from '@angular/core';
import { Usuarie } from '../../models/usuarie.model';
import { Router } from '@angular/router';
import { UsuarieHttpService } from '../../services/usuarie-http.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-profesional-manager',
  templateUrl: './profesional-manager.component.html',
  styleUrls: ['./profesional-manager.component.scss'],
})
export class ProfesionalManagerComponent implements OnInit {

  usuaries: Usuarie[];
  usuarieSeleccionado: Usuarie;
  
  constructor(
    private profesionalesService: UsuarieHttpService,//ProfesionalsArrayService,
    private router: Router,
    private stateService: StateService
  ) { }

  ngOnInit() {
    //this.profesionalesData.getAll().subscribe(profesionales => this.profesionales = profesionales);
    //esto se comenta pq en el init del httpserviceprofesional, cuando hace el getall llama al stateService y le asigna los profesionales, entonces aca los recibe ya que 
    //esta suscripto.
    this.profesionalesService.getAll();
    this.stateService.usuaries$.subscribe(profesionales => this.usuaries = profesionales);
    //this.stateService.setAppTitulo('Administracion de profesionales');

    
  }

  filtrarProfesionals(filtro: string) {
    this.profesionalesService.filterByNombreApellido(filtro).subscribe(profesionales => this.usuaries = profesionales);
  }

  seleccionarProfesional(profesional: Usuarie) {
    this.router.navigate(['profesionales', profesional.id.toString()]);
  }

  cancelarEdicion() {
    this.usuarieSeleccionado = null;
  }

  nuevoProfesional(){
    this.router.navigate(['profesionales', '']);
  }
  //pasa al profesionales edit.
  // actualizarProfesional(profesional: Profesional) {
  //   this.profesionalesData.update(profesional);
  //   this.profesionalSeleccionado = null;

  // }

}

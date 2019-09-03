import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuarie } from '../../models/usuarie.model';
import { Especialidad } from '../../models/especialidad.model';
import { UsuarieHttpService } from '../../services/usuarie-http.service';
import { EspecialidadHttpService } from '../../services/especialidad-http.service';
import { StateService } from '../../services/state.service';


@Component({
  selector: 'app-profesional-edit',
  templateUrl: './profesional-edit.component.html',
  styleUrls: ['./profesional-edit.component.scss']
})
export class ProfesionalEditComponent implements OnInit {

  usuarie: Usuarie;
  especialidades: Especialidad [];
  passvisible: boolean = true;
  constructor(
    private usuarieService: UsuarieHttpService, //ProfesionalsArrayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private especialidadesHttpService: EspecialidadHttpService
  ) { }

  ngOnInit() {
    this.especialidadesHttpService.getAll();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    /*cuando me llega la data la asigno al profesional */
    if(id  !== ''){
      this.usuarieService.getById(id).subscribe(usuarie => this.usuarie = usuarie); 
      this.passvisible = false;
    }
      
    else{
      this.usuarie = new Usuarie('','','',true,'','',0,''); 
    }
    /*aca puede que sea nul cuando se muestra la pantalla y da un error , entonces en el html se pone el *ngIf="profesional" para que se muestre cuando el valor esta
    asignado al alumnno */

    this.stateService.setAppTitulo('Edicion de profesional');
    this.stateService.especialidades$.subscribe(especialidades => this.especialidades = especialidades);
  }

  guardar(form: any) {
      if(this.usuarie.id  !== ''){
        this.usuarieService.update(this.usuarie).subscribe(
          (_) => this.router.navigate(['profesionales'])
        ); /*si aca no hago subscribe no se ejecuta el update. Ademas falta (JS tiene un solo hilo de ejecucion). Entonces
        cuando el hilo quede libre tengo que navegar a la ruta de profesionales, sino no se ve ya que es asincronico.)
        (_) es para indicar que tiene un parametro vacio*/  
      }else{
        this.usuarieService.insert(this.usuarie).subscribe(
          (_) => this.router.navigate(['profesionales'])
        ); /*si aca no hago subscribe no se ejecuta el update. Ademas falta (JS tiene un solo hilo de ejecucion). Entonces
        cuando el hilo quede libre tengo que navegar a la ruta de profesionales, sino no se ve ya que es asincronico.)
        (_) es para indicar que tiene un parametro vacio*/
      }
      
      this.router.navigate(['profesionales']);
  }

  cancelarEdicion() {
    this.router.navigate(['profesionales']);
  }

}

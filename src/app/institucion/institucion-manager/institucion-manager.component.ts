import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstitucionHttpService } from '../../services/institucion-http.service';
import { InstitucionAdapter }  from '../../services/institucion.adapter';
import { Institucion } from '../../models/institucion.model';
import { StateService } from 'src/app/services/state.service';
 
@Component({
  selector: 'app-institucion-manager',
  templateUrl: './institucion-manager.component.html',
  styleUrls: ['./institucion-manager.component.scss']
})
export class InstitucionManagerComponent implements OnInit {

  institucionSeleccionada : Institucion;
  instituciones : Institucion[];

  constructor(private institucionService: InstitucionHttpService, private router: Router, private institucionAdap: InstitucionAdapter,  private stateService: StateService) { 
    this.stateService.setAppTitulo('Administracion de Instituciones');
  }

  ngOnInit() {
    this.institucionService.getAll();
    this.stateService.instituciones$.subscribe(inst => this.instituciones = inst);
  }

  filtrarUS(filtro: string) {
    this.institucionService.filterByNombre(filtro).subscribe(uss => this.instituciones = uss);
  }

  nuevaUS() {
    this.router.navigate(['instituciones', '']);
  }

  seleccionarUS(institucion: Institucion) {
    this.router.navigate(['instituciones', institucion.id.toString()]);
  }
}

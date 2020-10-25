import { Component, OnDestroy, OnInit } from '@angular/core';
import { Consejeria } from '../../models/consejeria.model';
import { Router } from '@angular/router';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { StateService } from '../../services/state.service';
import { ConsejeriaList } from 'src/app/services/conejerias.adapter';
import {UsuarieHttpService} from '../../services/usuarie-http.service';
@Component({
  selector: 'app-consejeria-manager',
  templateUrl: './consejeria-manager.component.html',
  styleUrls: ['./consejeria-manager.component.scss'],
})
export class ConsejeriaManagerComponent implements OnInit , OnDestroy {
  subscripciones = [];
  //consejerias: Consejeria[];
  consejerias: ConsejeriaList[];
  consejeriaSeleccionado: Consejeria;

  constructor(
    private consejeriasService: ConsejeriasHttpService,//ConsejeriaArrayService,
    private router: Router,
    private stateService: StateService
  ) {
    this.stateService.setAppTitulo('Administracion de Consejerias');
   }

  ngOnInit() {
    this.consejeriasService.getAll();
    this.subscripciones.push(this.stateService.consejerias$.subscribe(consejerias => this.consejerias = consejerias));
  }

  filtrarConsejeria(filtro: string) {
    this.subscripciones.push(this.consejeriasService.filterByNombreApellido(filtro).subscribe(consejerias => this.consejerias = consejerias));
  }

  seleccionarConsejeria(consejeria: Consejeria) {
    this.router.navigate(['consejerias', consejeria._id.toString()]);
  }

  cancelarEdicion() {
    this.consejeriaSeleccionado = null;
  }

  nuevoConsejeria(){
    this.router.navigate(['consejerias', 'new']);
  }
  ngOnDestroy() {
    this.subscripciones.forEach(s => s.unsubscribe())
  }
}

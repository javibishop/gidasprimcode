import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Consejeria } from '../../models/consejeria.model';
import { ConsejeriaList } from 'src/app/services/conejerias.adapter';

@Component({
  selector: 'app-consejeria-list',
  templateUrl: './consejeria-list.component.html',
  styleUrls: ['./consejeria-list.component.scss']
})
export class ConsejeriaListComponent implements OnInit {
  //consejerias a mostrar. Recibe el array de consejerias ya que es el input.
  @Input() consejerias: ConsejeriaList[];
  consejeriaSeleccionado: Consejeria = null;
  @Output() seleccionar = new EventEmitter<Consejeria> ();
  columnas: string [] = ['Nro', 'Fecha','Usuaria','Prof1', 'Prof2', 'Acciones'];
  
  constructor() { }

  ngOnInit() {
  }

  seleccionarConsejeria(consejeria: Consejeria ){
    this.consejeriaSeleccionado = consejeria;
    this.seleccionar.emit(consejeria);
  }
  
}

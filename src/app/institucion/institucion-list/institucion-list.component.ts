import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Institucion } from '../../models/institucion.model';

@Component({
  selector: 'app-institucion-list',
  templateUrl: './institucion-list.component.html',
  styleUrls: ['./institucion-list.component.scss']
})
export class InstitucionListComponent implements OnInit {

  @Input() instituciones: Institucion[];
  @Output() seleccionar = new EventEmitter<Institucion> ();
  columnas: string [] = ['Nombre','Direccion', 'Telefono', 'Acciones'];

  constructor() { }

  ngOnInit() {
  }

  seleccionarInstitucion(institucion: Institucion ){
    this.seleccionar.emit(institucion);
  }
}

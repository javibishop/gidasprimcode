import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuarie } from '../../models/usuarie.model';

@Component({
  selector: 'app-profesional-list',
  templateUrl: './profesional-list.component.html',
  styleUrls: ['./profesional-list.component.scss']
})
export class ProfesionalListComponent implements OnInit {
  //profesionales a mostrar. Recibe el array de profesionales ya que es el input.
  @Input() profesionales: Usuarie[];
  profesionalSeleccionado: Usuarie = null;
  @Output() seleccionar = new EventEmitter<Usuarie> ();
  columnas: string [] = ['Nro', 'Nombre','Activo', 'Acciones'];
  
  constructor() { }

  ngOnInit() {
  }

  seleccionarProfesional(profesional: Usuarie ){
    this.profesionalSeleccionado = profesional;
    this.seleccionar.emit(profesional);
  }
  
}

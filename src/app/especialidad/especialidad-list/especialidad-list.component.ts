
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Especialidad } from '../../models/especialidad.model';

@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.component.html',
  styleUrls: ['./especialidad-list.component.scss']
})
export class EspecialidadListComponent implements OnInit {
  //consejerias a mostrar. Recibe el array de consejerias ya que es el input.
  @Input() especialidades: Especialidad[];
  especialidadSeleccionada: Especialidad = null;
  @Output() seleccionar = new EventEmitter<Especialidad> ();
  columnas: string [] = ['Id', 'Nombre','Acciones'];
  
  constructor() { }

  ngOnInit() {
  }

  seleccionarEspecialidad(especialdiad: Especialidad ){
    this.especialidadSeleccionada = especialdiad;
    this.seleccionar.emit(especialdiad);
  }
  
}

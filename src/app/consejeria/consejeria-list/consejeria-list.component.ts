import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { Consejeria } from '../../models/consejeria.model';
import { ConsejeriaList } from 'src/app/services/conejerias.adapter';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-consejeria-list',
  templateUrl: './consejeria-list.component.html',
  styleUrls: ['./consejeria-list.component.scss']
})
export class ConsejeriaListComponent implements OnInit,  AfterViewInit{
  //consejerias a mostrar. Recibe el array de consejerias ya que es el input.
  dataSource = new MatTableDataSource<any>();
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  _consejerias: ConsejeriaList[];
  @Input() set consejerias(data: ConsejeriaList[]) {
    // you might do something special in here
    this._consejerias = data;
    this.dataSource.data = this._consejerias;
    
  }
  get consejerias() {
    // you might do something special in here
    return this._consejerias;
  }

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

  ngAfterViewInit() {
    
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
  
}

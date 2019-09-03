import { Injectable } from '@angular/core';
import { GenericList,ListItem } from '../models/list-item.model';

@Injectable({
  providedIn: 'root'
})

export class NivelEstudioListService extends GenericList{

  constructor() {
    super();
    this.list = [
      new ListItem( 1, 'Primario'),
      new ListItem( 1, 'Secundario'),
      new ListItem( 3, 'Terciario'),
      new ListItem( 4, 'Universitario')
    ];
  }
}
 
@Injectable({
  providedIn: 'root'
})
export class EstadoEstudioListService extends GenericList{

  constructor() {
    super();
    this.list = [
      new ListItem( 1, 'Completo'),
      new ListItem( 2, 'Incompleto'),
      new ListItem( 3, 'En curso')
    ];
  }
}

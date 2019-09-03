

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Usuarie } from '../models/usuarie.model';
import { environment } from '../../environments/environment.prod';
import { UsuariesAdapter, UsuarieApi } from './usuaries.adapter';
import { map, tap } from 'rxjs/operators';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarieHttpService {
  private url = environment.baseUrl + 'usuarie';
  constructor(
    private HttpClient: HttpClient,
    private usuariesAdapter: UsuariesAdapter,
    private stateService: StateService
  ) {
    
   }

  getAll() {
    return this.HttpClient.get<UsuarieApi[]>(this.url)
    .pipe(
      map(usuariesApi => usuariesApi.map(usuarieApi => this.usuariesAdapter.adapt(usuarieApi)))
    )
    .subscribe(usuaries => this.stateService.setUsuaries(usuaries));
  }
  
  getById(id: string) : Observable<Usuarie> {
          //const url = this.url + '/' + id.toString();
          const url = `${this.url}/${id}`; /*interpolacion */
          return this.HttpClient.get<UsuarieApi>(url) 
          .pipe(
            map(usuarieApi =>
              this.usuariesAdapter.adapt(usuarieApi)
              )
          )
  }
  
  filterByNombreApellido(nombre: string) : Observable<Usuarie[]>{
      /*esto devuelve un nuevo array, por eso el input del list component se repinta. Si fuera la misma istancia, no se refresca */
      //return this.usuaries.filter(a =>(a.nombre + ' ' + a.apellido).toLowerCase().includes(nombre.toLowerCase()) )
      // return this.getAll()
      // .pipe(
      //   map(usuaries => usuaries.filter(a =>(a.nombre + ' ' + a.apellido).toLowerCase().includes(nombre.toLowerCase())))
      // )
      //cambio luego del state service.
      return this.HttpClient.get<UsuarieApi[]>(this.url)
      .pipe(
        map(usuariesApi => usuariesApi.map(usuarieApi => this.usuariesAdapter.adapt(usuarieApi))),
        map(usuaries => usuaries.filter(a =>(a.nombre + ' ' + a.apellido).toLowerCase().includes(nombre.toLowerCase())))
      )

      //el primer map tiene como salida un array de objetos usuaries. se los pasa al otro map.
      
  }
  
  update(usuarie: Usuarie): Observable<void>{
      // var index = this.usuaries.findIndex(a => a.id === usuarie.id);
      // this.usuaries[index] = usuarie;
      const url = `${this.url}/${usuarie.id}`; /*interpolacion */
      /* */
      return this.HttpClient.put<void>(url, this.usuariesAdapter.adaptToApi(usuarie))
      .pipe(tap(() =>{return this.getAll()}));
      //tap sirve para ejecutar algo si interrumpir la llamada del observable.
  }

  insert(usuarie: Usuarie): Observable<void>{
    // var index = this.usuaries.findIndex(a => a.id === usuarie.id);
    // this.usuaries[index] = usuarie;
    //const url = `${this.url}/${usuarie.id}`; /*interpolacion */
    /* */
    return this.HttpClient.post<void>(this.url, this.usuariesAdapter.adaptToApi(usuarie)).pipe(tap(() =>{return this.getAll()}));
}
}

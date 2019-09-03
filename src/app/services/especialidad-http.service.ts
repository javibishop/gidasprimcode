

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Especialidad } from '../models/especialidad.model';
import { environment } from '../../environments/environment.prod';
import { EspecialidadesAdapter, EspecialidadApi } from './especialidades.adapter';
import { map, tap } from 'rxjs/operators';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadHttpService {
  private url = environment.baseUrl + 'especialidad';
  constructor(private HttpClient: HttpClient,private especialidadesAdapter: EspecialidadesAdapter,private stateService: StateService) 
  {
    //this.getAll();
  }

  getAll() {
    return this.HttpClient.get<EspecialidadApi[]>(this.url)
    .pipe(
      map(especialidadApi => especialidadApi.map(especialidadApi => this.especialidadesAdapter.adapt(especialidadApi)))
    )
    .subscribe(especialidades => this.stateService.setEspecialidades(especialidades));
  }
  
  getById(id: string) : Observable<Especialidad> {
          //const url = this.url + '/' + id.toString();
          const url = `${this.url}/${id}`; /*interpolacion */
          return this.HttpClient.get<EspecialidadApi>(url)
          .pipe(
            map(especialidadApi =>
              this.especialidadesAdapter.adapt(especialidadApi)
              )
          )
  }
  
  filterByNombreApellido(nombre: string) : Observable<Especialidad[]>{
      /*esto devuelve un nuevo array, por eso el input del list component se repinta. Si fuera la misma istancia, no se refresca */
      //return this.Especialidads.filter(a =>(a.nombre + ' ' + a.apellido).toLowerCase().includes(nombre.toLowerCase()) )
      // return this.getAll()
      // .pipe(
      //   map(Especialidads => Especialidads.filter(a =>(a.nombre + ' ' + a.apellido).toLowerCase().includes(nombre.toLowerCase())))
      // )
      //cambio luego del state service.
      return this.HttpClient.get<EspecialidadApi[]>(this.url)
      .pipe(
        map(EspecialidadsApi => EspecialidadsApi.map(EspecialidadApi => this.especialidadesAdapter.adapt(EspecialidadApi))),
        map(Especialidads => Especialidads.filter(a =>a.nombre.toLowerCase().includes(nombre.toLowerCase())))
      )

      //el primer map tiene como salida un array de objetos Especialidads. se los pasa al otro map.
      
  }
  
  update(Especialidad: Especialidad): Observable<void>{
      // var index = this.Especialidads.findIndex(a => a.id === Especialidad.id);
      // this.Especialidads[index] = Especialidad;
      const url = `${this.url}/${Especialidad.id}`; /*interpolacion */
      /* */
      return this.HttpClient.put<void>(url, this.especialidadesAdapter.adaptToApi(Especialidad))
      .pipe(tap(() =>{return this.getAll()}));
      //tap sirve para ejecutar algo si interrumpir la llamada del observable.
  }

  insert(Especialidad: Especialidad): Observable<void>{
    // var index = this.Especialidads.findIndex(a => a.id === Especialidad.id);
    // this.Especialidads[index] = Especialidad;
    //const url = `${this.url}/${Especialidad.id}`; /*interpolacion */
    /* */
    return this.HttpClient.post<void>(this.url, this.especialidadesAdapter.adaptToApi(Especialidad)).pipe(tap(() =>{return this.getAll()}));
}
}

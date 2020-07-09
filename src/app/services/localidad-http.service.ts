import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Localidad } from '../models/localidad.model';
import { environment } from '../../environments/environment.prod';
import { LocalidadAdapter, LocalidadApi, LocalidadApiGob } from './localidad.adapter';
import { map, tap } from 'rxjs/operators';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class LocalidadHttpService {
  private url = environment.baseUrl + 'localidad';
  constructor(
    private HttpClient: HttpClient,
    private localidadAdapter: LocalidadAdapter,
    private stateService: StateService
  ) {
    
   }

  getByPartido(partidoId: string) : Observable<Localidad []>  {
    const url = `${this.url}/${partidoId}`; 
    return this.HttpClient.get<LocalidadApi[]>(url)
    .pipe(
      map(localidadApi => localidadApi.map(localidadApi => this.localidadAdapter.adapt(localidadApi)))
    )
  }

  getByPartidoGob(partidoId: string) : Observable<Localidad []>  {
    const url = `${environment.baseUrl}localidades/${partidoId}`; 
    return this.HttpClient.get<LocalidadApiGob[]>(url)
    .pipe(
      map(localidadApi => localidadApi.map(localidadApi => this.localidadAdapter.adaptFromGob(localidadApi)))
    )
  }
  getAll() {
    return this.HttpClient.get<LocalidadApi[]>(this.url)
    .pipe(
      map(localidadApi => localidadApi.map(paisApi => this.localidadAdapter.adapt(paisApi)))
    )
    .subscribe(localidades => this.stateService.setLocalidades(localidades));
  }
  
  filterByNombreApellido(nombre: string) : Observable<Localidad[]>{
      return this.HttpClient.get<LocalidadApi[]>(this.url)
      .pipe(
        map(localidadApi => localidadApi.map(paisApi => this.localidadAdapter.adapt(paisApi))),
        map(localidades => localidades.filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase())))
      )
  }
}

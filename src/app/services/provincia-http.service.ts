

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Provincia } from '../models/provincia.model';
import { environment } from '../../environments/environment.prod';
import { ProvinciaAdapter, ProvinciaApi, ProvinciaApiGob } from './provincia.adapter';
import { map, tap } from 'rxjs/operators';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class ProvinciaHttpService {
  private url = environment.baseUrl + 'provincia';
  constructor(
    private HttpClient: HttpClient,
    private provinciaAdapter: ProvinciaAdapter,
    private stateService: StateService
  ) {
   
   }


   getTodas() : Observable<Provincia[]>  {
    return this.HttpClient.get<ProvinciaApiGob[]>(`${environment.baseUrl}provincias`)
    .pipe(
      map(provinciasApi => provinciasApi.map(provinciaApi => this.provinciaAdapter.adaptFromGob(provinciaApi)))
    )
  }

  getPorPais(id:string) : Observable<Provincia[]>  {
    return this.HttpClient.get<ProvinciaApi[]>(`${this.url}/${id}`)
    .pipe(
      map(provinciasApi => provinciasApi.map(provinciaApi => this.provinciaAdapter.adapt(provinciaApi)))
    )
  }
  
  filterByNombreApellido(nombre: string) : Observable<Provincia[]>{
      return this.HttpClient.get<ProvinciaApi[]>(this.url)
      .pipe(
        map(provinciasApi => provinciasApi.map(provinciaApi => this.provinciaAdapter.adapt(provinciaApi))),
        map(provincias => provincias.filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase())))
      )
  }
}

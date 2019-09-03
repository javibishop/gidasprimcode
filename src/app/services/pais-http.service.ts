

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Pais } from '../models/pais.model';
import { environment } from '../../environments/environment.prod';
import { PaisAdapter, PaisApi } from './pais.adapter';
import { map, tap } from 'rxjs/operators';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class PaisHttpService {
  private url = environment.baseUrl + 'pais';
  constructor(
    private HttpClient: HttpClient,
    private paisAdapter: PaisAdapter,
    private stateService: StateService
  ) {
   
   }

  getAll() {
    return this.HttpClient.get<PaisApi[]>(this.url)
    .pipe(
      map(paisesApi => paisesApi.map(paisApi => this.paisAdapter.adapt(paisApi)))
    )
    .subscribe(paises => this.stateService.setPaises(paises));
  }
  
  filterByNombreApellido(nombre: string) : Observable<Pais[]>{
      return this.HttpClient.get<PaisApi[]>(this.url)
      .pipe(
        map(paisesApi => paisesApi.map(paisApi => this.paisAdapter.adapt(paisApi))),
        map(paises => paises.filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase())))
      )
  }
}

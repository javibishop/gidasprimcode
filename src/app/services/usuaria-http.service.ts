
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Usuaria } from '../models/usuaria.model';
import { environment } from '../../environments/environment.prod';
import { UsuariasAdapter, UsuariaApi } from './usuarias.adapter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariaHttpService {
  private url = environment.baseUrl + 'usuaria';
  constructor(
    private HttpClient: HttpClient,
    private usuariasAdapter: UsuariasAdapter
  ) {
    
   }

  getAll() {
    return this.HttpClient.get<UsuariaApi[]>(this.url)
    .pipe(
      map(usuariasApi => usuariasApi.map(usuarieApi => this.usuariasAdapter.adapt(usuarieApi)))
    )
    .subscribe();
  }
  
  getById(id: string) : Observable<Usuaria> {
    //const url = this.url + '/' + id.toString();
    const url = `${this.url}/${id}`; /*interpolacion */
    return this.HttpClient.get<UsuariaApi>(url)
    .pipe(
      map(usuarieApi =>
        this.usuariasAdapter.adapt(usuarieApi)
        )
    )
  }
}

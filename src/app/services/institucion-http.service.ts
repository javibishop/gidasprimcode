
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Institucion } from '../models/institucion.model';
import { environment } from '../../environments/environment.prod';
import { InstitucionAdapter, InstitucionApi } from './institucion.adapter';
import { map, tap } from 'rxjs/operators';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionHttpService {
  private url = environment.baseUrl + 'institucion';
  constructor(
    private HttpClient: HttpClient,
    private institucionAdapter: InstitucionAdapter,
    private stateService: StateService
  ) {
    
   }

  getAll() {
    return this.HttpClient.get<InstitucionApi[]>(this.url)
    .pipe(
      map(institucionApi => institucionApi.map(institucionApi => this.institucionAdapter.adapt(institucionApi)))
    )
    .subscribe(insts => this.stateService.setInstitucion(insts));
  }
  
  getById(id: string) : Observable<Institucion> {
    //const url = this.url + '/' + id.toString();
    const url = `${this.url}/${id}`; /*interpolacion */
    return this.HttpClient.get<InstitucionApi>(url)
    .pipe(
      map(institucionApi =>
        this.institucionAdapter.adapt(institucionApi)
        )
    )
  }

  filterByNombre(nombre: string) : Observable<Institucion[]>{
    return this.HttpClient.get<InstitucionApi[]>(this.url)
    .pipe(
      map(institucionApi => institucionApi.map(institucionApi => this.institucionAdapter.adapt(institucionApi))),
      map(institucion => institucion.filter(a =>(a.nombre).toLowerCase().includes(nombre.toLowerCase())))
    )

    //el primer map tiene como salida un array de objetos usuaries. se los pasa al otro map.
    
  }

  update(institucion: Institucion): Observable<void>{
    // var index = this.usuaries.findIndex(a => a.id === usuarie.id);
    // this.usuaries[index] = usuarie;
    const url = `${this.url}/${institucion.id}`; /*interpolacion */
    /* */
    return this.HttpClient.put<void>(url, this.institucionAdapter.adaptToApi(institucion))
    .pipe(tap(() =>{return this.getAll()}));
    //tap sirve para ejecutar algo si interrumpir la llamada del observable.
  }

  insert(institucion: Institucion): Observable<void>{
    // var index = this.usuaries.findIndex(a => a.id === usuarie.id);
    // this.usuaries[index] = usuarie;
    //const url = `${this.url}/${usuarie.id}`; /*interpolacion */
    /* */
    return this.HttpClient.post<void>(this.url, this.institucionAdapter.adaptToApi(institucion))
    .pipe(tap(() =>{return this.getAll()}
    
    ));
  }
}

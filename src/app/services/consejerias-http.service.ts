import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Consejeria, EntrevistaPostAborto, EstudioComplementario, GestaActual, Antecedente } from '../models/consejeria.model';
import { Usuaria } from '../models/usuaria.model';
import { environment } from '../../environments/environment.prod';
import { ConsejeriasAdapter, ConsejeriaApi, ConsejeriaList } from './conejerias.adapter';
import { EntrevistaAdapter, EntrevistaApi } from './entrevista.adapter';
import { GestaActualAdapter, GestaActualApi } from './gestaactual.adapter';
import { EstudioComplementarioAdapter, EstudioApi } from './estudio.adapter';
import { AntecedentesAdapter, AntecedenteApi } from './antecedente.adapter';
import { UsuariasAdapter, UsuariaApi } from './usuarias.adapter';
import { map, tap } from 'rxjs/operators';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class ConsejeriasHttpService {
  private url = environment.baseUrl;
  private urlConsejeria = this.url + 'consejeria/';
  private urlEntrevista = this.url + 'entrevistapostaborto/';
  private urlEstudio = this.url + 'estudiocomplementario/';
  private urlAntecedente = this.url + 'antecedente/';
  private urlGestas  = this.url + 'gestaactual/';
  private urlUsuaria = this.url + 'usuaria/';
  constructor(
    private HttpClient: HttpClient,
    private stateService: StateService,
    private consejeriasAdapter: ConsejeriasAdapter,
    private entrevistaAdapter: EntrevistaAdapter,
    private gestaActualAdapter: GestaActualAdapter,
    private estudioComplementarioAdapter: EstudioComplementarioAdapter,
    private antecedentesAdapter: AntecedentesAdapter,
    private usuariasAdapter: UsuariasAdapter,
  ) {}

  getAll() {
    return this.HttpClient.get<ConsejeriaApi[]>(this.urlConsejeria)
    .pipe(
      map(consejeriasApi => consejeriasApi.map(consejeriaApi => this.consejeriasAdapter.adaptToList(consejeriaApi)))
    )
    .subscribe(consejerias => this.stateService.setConsejeria(consejerias));
  }
  
  filterByNombreApellido(nombre: string) : Observable<ConsejeriaList[]>{
    /*esto devuelve un nuevo array, por eso el input del list component se repinta. Si fuera la misma istancia, no se refresca */
    //return this.consejerias.filter(a =>(a.nombre + ' ' + a.apellido).toLowerCase().includes(nombre.toLowerCase()) )
    // return this.getAll()
    // .pipe(
    //   map(consejerias => consejerias.filter(a =>(a.nombre + ' ' + a.apellido).toLowerCase().includes(nombre.toLowerCase())))
    // )
    //cambio luego del state service.
    return this.HttpClient.get<ConsejeriaApi[]>(this.urlConsejeria)
    .pipe(
      map(consejeriasApi => consejeriasApi.map(consejeriaApi => this.consejeriasAdapter.adaptToList(consejeriaApi))),
      map(consejerias => consejerias.filter(a => 
        (a.numero + ' ' + a.observacion + ' ' + a.usuariaNombre+ ' ' + a.usuarie1Nombre+ ' ' + a.usuarie2Nombre+ ' ' + a.usuariaApellido+ ' ' + a.usuarie1Apellido
        + ' ' + a.usuarie2Apellido)
        .toLowerCase().includes(nombre.toLowerCase())))
    )
    //el primer map tiene como salida un array de objetos consejerias. se los pasa al otro map.
    
}

  getById(id: string) : Observable<Consejeria> {
    const url = `${this.urlConsejeria}${id}`; /*interpolacion */
    return this.HttpClient.get<ConsejeriaApi>(url)
    .pipe(
      map(consejeriaApi => this.consejeriasAdapter.adapt(consejeriaApi))
    )
  }

  getEntrevistaByConsejeriaId(idConsejeria: string) : Observable<EntrevistaPostAborto> {
    const url = `${this.urlEntrevista}porconsejeria/${idConsejeria}`; /*interpolacion */
      return this.HttpClient.get<EntrevistaApi>(url)
      .pipe(
        map(entrevistaApi => this.entrevistaAdapter.adapt(entrevistaApi))
      )
  }

  getEstudioByConsejeriaId(idConsejeria: string) : Observable<EstudioComplementario> {
    
    const url = `${this.urlEstudio}porconsejeria/${idConsejeria}`; /*interpolacion */
    return this.HttpClient.get<EstudioApi>(url)
    .pipe(
      map(estudioApi => this.estudioComplementarioAdapter.adapt(estudioApi))
    )
}

  getGestasByConsejeriaId(idConsejeria: string) : Observable<GestaActual> {
    
    const url = `${this.urlGestas}porconsejeria/${idConsejeria}`; /*interpolacion */
    return this.HttpClient.get<GestaActualApi>(url)
    .pipe(
      map(gestaActualApi => this.gestaActualAdapter.adapt(gestaActualApi))
    )
  }

  getAntecedenteByConsejeriaId(idConsejeria: string) : Observable<Antecedente> {
    const url = `${this.urlAntecedente}porconsejeria/${idConsejeria}`; /*interpolacion */
    return this.HttpClient.get<AntecedenteApi>(url)
    .pipe(
      map(antecedenteApi => this.antecedentesAdapter.adapt(antecedenteApi))
    )
  }

  getUsuariaByConsejeriaId(idConsejeria: string) : Observable<Usuaria> {
    
    const url = `${this.urlUsuaria}porconsejeria/${idConsejeria}`; /*interpolacion */
    return this.HttpClient.get<UsuariaApi>(url)
    .pipe(
      map(usuariaApi => this.usuariasAdapter.adapt(usuariaApi))
    )
  }

  getUsuariaById(id: string) : Observable<Usuaria> {
    const url = `${this.urlUsuaria}${id}`; /*interpolacion */
    return this.HttpClient.get<UsuariaApi>(url)
    .pipe(
      map(usuariaApi => this.usuariasAdapter.adapt(usuariaApi))
    )
  }

parseJsonDate(jsonDateString): Date {
  return new Date(parseInt(jsonDateString.replace('/Date(', '')));
}

updateAntecedente(antecedente: Antecedente): Observable<Antecedente>{
    const url = `${this.urlAntecedente}${antecedente.id}`; /*interpolacion */
    return this.HttpClient.put<Antecedente>(url, antecedente)
    //.pipe(tap(() =>{return this.getAll()}));
}

insertAntecedente(antecedente: Antecedente): Observable<Antecedente>{
  return this.HttpClient.post<Antecedente>(this.urlAntecedente, antecedente);
}

updateEntrevista(entrevistaPostAborto: EntrevistaPostAborto): Observable<EntrevistaPostAborto>{
  const url = `${this.urlEntrevista}${entrevistaPostAborto.id}`; /*interpolacion */
  return this.HttpClient.put<EntrevistaPostAborto>(url, entrevistaPostAborto)
  //.pipe(tap(() =>{return this.getAll()}));
}

  insertEntrevista(entrevistaPostAborto: EntrevistaPostAborto): Observable<EntrevistaPostAborto>{
    return this.HttpClient.post<EntrevistaPostAborto>(this.urlEntrevista, entrevistaPostAborto);
  }

  updateGestaActual(gestaActual: GestaActual): Observable<GestaActual>{
    const url = `${this.urlGestas}${gestaActual.id}`; /*interpolacion */
    return this.HttpClient.put<GestaActual>(url, gestaActual)
    //.pipe(tap(() =>{return this.getAll()}));
  }

  insertGestaActual(gestaActual: GestaActual): Observable<GestaActual>{
    return this.HttpClient.post<GestaActual>(this.urlGestas, gestaActual);
  }

  updateEstudio(estudioComplementario: EstudioComplementario): Observable<EstudioComplementario>{
    const url = `${this.urlEstudio}${estudioComplementario.id}`; /*interpolacion */
    return this.HttpClient.put<EstudioComplementario>(url, estudioComplementario)
  }

  insertEstudio(estudioComplementario: EstudioComplementario): Observable<EstudioComplementario>{
    return this.HttpClient.post<EstudioComplementario>(this.urlEstudio, estudioComplementario);
  }

  updateUsuaria(usuaria: Usuaria): Observable<Usuaria>{
    const url = `${this.urlUsuaria}${usuaria.id}`; /*interpolacion */
    return this.HttpClient.put<Usuaria>(url, usuaria);
  }

  insertUsuaria(usuaria: Usuaria): Observable<Usuaria>{
    return this.HttpClient.post<Usuaria>(this.urlUsuaria, usuaria);
  }

  update(consejeria: Consejeria): Observable<Consejeria>{
    const url = `${this.urlConsejeria}${consejeria._id}`; /*interpolacion */
    return this.HttpClient.put<Consejeria>(url, this.consejeriasAdapter.adaptToApi(consejeria))
    .pipe(tap(() =>{return this.getAll()}));
  }

  insert(consejeria: Consejeria): Observable<Consejeria>{
    return this.HttpClient.post<Consejeria>(this.urlConsejeria, this.consejeriasAdapter.adaptToApi(consejeria));
  }

}

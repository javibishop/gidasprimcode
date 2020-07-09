import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Usuarie } from '../models/usuarie.model';
import { Especialidad } from '../models/especialidad.model';
import { Pais } from '../models/pais.model';
import { Provincia } from '../models/provincia.model';
import { Localidad } from '../models/localidad.model';
import { Partido } from '../models/partido.model';
import { ConsejeriaList } from './conejerias.adapter';
import { Institucion } from '../models/institucion.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public appTitulo$ = new BehaviorSubject<string>('');
  public usuaries$ = new BehaviorSubject<Usuarie[]>([]);
  public consejerias$ = new BehaviorSubject<ConsejeriaList[]>([]);
  public especialidades$ = new BehaviorSubject<Especialidad[]>([]);
  public instituciones$ = new BehaviorSubject<Institucion[]>([]);
  public paises$ = new BehaviorSubject<Pais[]>([]);
  public provincias$ = new BehaviorSubject<Provincia[]>([]);
  public localidades$ = new BehaviorSubject<Localidad[]>([]);
  public partidos$ = new BehaviorSubject<Partido[]>([]);
  constructor() { }

  setAppTitulo(titulo: string){
    //para informar a los suscriptores.
    this.appTitulo$.next(titulo);
  }

  setUsuaries(usuaries: Usuarie[]){
    //para informar a los suscriptores.
    this.usuaries$.next(usuaries);
  }

  setConsejeria(consejerias: ConsejeriaList[]){
    //para informar a los suscriptores.
    this.consejerias$.next(consejerias);
  }

  setEspecialidades(especialidades: Especialidad[]){
    //para informar a los suscriptores.
    this.especialidades$.next(especialidades);
  }

  setInstitucion(instituciones: Institucion[]){
    //para informar a los suscriptores.
    this.instituciones$.next(instituciones);
  }

  setPaises(paises: Pais[]){
    //para informar a los suscriptores.
    this.paises$.next(paises);
  }
  
  setProvincias(provincias: Provincia[]){
    //para informar a los suscriptores.
    this.provincias$.next(provincias);
  }
  setLocalidades(localidades: Localidad[]){
    //para informar a los suscriptores.
    this.localidades$.next(localidades);
  }
  setPartidos(partidos: Partido[]){
    //para informar a los suscriptores.
    this.partidos$.next(partidos);
  }
}

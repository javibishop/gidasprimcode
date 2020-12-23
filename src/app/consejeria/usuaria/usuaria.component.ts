import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Usuaria } from '../../models/usuaria.model';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { Router } from '@angular/router';
import { PaisHttpService } from '../../services/pais-http.service';
import { ProvinciaHttpService } from '../../services/provincia-http.service';
import { PartidoHttpService } from '../../services/partido-http.service';
import { LocalidadHttpService } from '../../services/localidad-http.service';
import { StateService } from '../../services/state.service';
import {NivelEstudioListService, EstadoEstudioListService} from '../../services/list-item.service'
import { ListItem } from '../../models/list-item.model';
import { Pais } from 'src/app/models/pais.model';
import { Provincia } from 'src/app/models/provincia.model';
import { Localidad } from 'src/app/models/localidad.model';
import { Partido } from 'src/app/models/partido.model';

@Component({
  selector: 'app-usuaria',
  templateUrl: './usuaria.component.html',
  styleUrls: ['./usuaria.component.scss']
})
export class UsuariaComponent implements OnInit, OnDestroy {
  subscripciones = [];
  @Input() usuaria: Usuaria;
  @Output() usuariaIdInsert = new EventEmitter <number>();
  paises: Pais [];
  provincias: Provincia[];
  partidos: Partido[];
  localidades: Localidad[];
  nivelEstudios: ListItem[];
  estadoEstudios: ListItem[];

  constructor(private consejeriaService: ConsejeriasHttpService, private paisHttpService: PaisHttpService, private provinciaHttpService: ProvinciaHttpService,
    private partidoHttpService: PartidoHttpService, private localidadHttpService: LocalidadHttpService, private stateService: StateService,
    private nivelEstudioListService: NivelEstudioListService, private estadoEstudioListService: EstadoEstudioListService,
    private router: Router)
    { }

  ngOnInit() {
    this.estadoEstudios = this.estadoEstudioListService.list;
    this.nivelEstudios = this.nivelEstudioListService.list;
    this.paisHttpService.getAll();
    this.subscripciones.push(this.provinciaHttpService.getTodas().subscribe(provs => this.provincias = provs));
    
    this.subscripciones.push(this.stateService.paises$.subscribe(paises => this.paises = paises));
    this.subscripciones.push(this.stateService.provincias$.subscribe(provincias => this.provincias = provincias));

    if(this.usuaria == undefined){

      this.usuaria = new Usuaria('','','',0, true, new Date(),'','','','','','', false, false, false, false, false, false, false, '', '',0, 0,'','');
      // datos para varela hc.
      this.usuaria.nacionalidadId = '5f73aec7c17827403b7b9541';
      this.usuaria.provinciaId = '06';
      this.usuaria.partidoId = '060274';
      this.usuaria.localidadId = '06274010003';
      this.selectProvincia(this.usuaria.provinciaId);
      this.selectPartido(this.usuaria.partidoId);
    }
    else{
      this.selectProvincia(this.usuaria.provinciaId);
      this.selectPartido(this.usuaria.partidoId);
    }
    
  }

  guardarUsuaria(form: any) {
    if(this.usuaria != undefined && this.usuaria.id !== '') {
      this.subscripciones.push(this.consejeriaService.updateUsuaria(this.usuaria).subscribe(
        (_) => {}
      )); 
   }else{
    this.subscripciones.push(this.consejeriaService.insertUsuaria(this.usuaria).subscribe(
      (result: any) => {
        this.usuariaIdInsert.emit(result.usuaria);    
      }
    )); 
   }
}


selectPais(paisid: string){
  this.subscripciones.push(this.provinciaHttpService.getTodas().subscribe(provs => this.provincias = provs));
}

  selectProvincia(provinciaid: string){
    this.subscripciones.push(this.partidoHttpService.getByProvinciaGob(provinciaid).subscribe(partidos => this.partidos = partidos));
  }
  selectPartido(partidoid: string){
    this.subscripciones.push(this.localidadHttpService.getByPartidoGob(partidoid).subscribe(localidades => this.localidades = localidades));
  }
  
  cancelarEdicionUsuaria() {
    this.router.navigate(['consejerias']);
  }

  ngOnDestroy() {
    this.subscripciones.forEach(s => s.unsubscribe())
  }
}

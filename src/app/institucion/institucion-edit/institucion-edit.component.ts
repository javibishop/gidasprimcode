import { Component, OnInit } from '@angular/core';
import { ProvinciaHttpService } from '../../services/provincia-http.service';
import { PartidoHttpService } from '../../services/partido-http.service';
import { LocalidadHttpService } from '../../services/localidad-http.service';
import { InstitucionHttpService } from '../../services/institucion-http.service';
import { Provincia } from 'src/app/models/provincia.model';
import { Partido } from 'src/app/models/partido.model';
import { Institucion } from 'src/app/models/institucion.model';
import { Localidad } from 'src/app/models/localidad.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-institucion-edit',
  templateUrl: './institucion-edit.component.html',
  styleUrls: ['./institucion-edit.component.scss']
})
export class InstitucionEditComponent implements OnInit {
  provincias: Provincia[];
  partidos: Partido[];
  localidades: Localidad[];
  institucion : Institucion;
  constructor(private provinciaHttpService: ProvinciaHttpService, private partidoHttpService: PartidoHttpService, private localidadHttpService: LocalidadHttpService,
    private router: Router, private stateService: StateService, private institucionHttpService: InstitucionHttpService, private activatedRoute: ActivatedRoute,)
   { }

  ngOnInit() {
    this.provinciaHttpService.getTodas().subscribe(provs => this.provincias = provs);
    this.stateService.provincias$.subscribe(provincias => this.provincias = provincias);

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id == '' || id == undefined){
      this.institucion = new Institucion('','','','', '', 0,'',true,'');
      
      this.stateService.setAppTitulo('Alta de Institucion');
    }
    else{
      this.institucionHttpService.getById(id).subscribe(inst => {
        this.institucion = inst;
        this.selectProvincia(this.institucion.provinciaId);
        this.selectPartido(this.institucion.partidoId);
        //this.select(this.institucion.partidoId);
      }); 
      this.stateService.setAppTitulo('Edicion de Institucion');
    }
  }

  guardarInstitucion(form: any) {
    if(this.institucion != undefined && this.institucion.id !== '') {
      this.institucionHttpService.update(this.institucion).subscribe(
        (_) => {this.router.navigate(['instituciones']);}
      ); 
   }else{
    this.institucionHttpService.insert(this.institucion).subscribe(
      (result: any) => {
        this.router.navigate(['instituciones']);
      }
    ); 
   }
}
  
    selectProvincia(provinciaid: string){
      this.partidoHttpService.getByProvinciaGob(provinciaid).subscribe(partidos => this.partidos = partidos);
    }
    selectPartido(partidoid: string){
      this.localidadHttpService.getByPartidoGob(partidoid).subscribe(localidades => this.localidades = localidades);
    }
    
    cancelarEdicionUsuaria() {
      this.router.navigate(['instituciones']);
    }

}

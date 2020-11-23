import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { EstudioComplementario } from '../../models/consejeria.model';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-estudio-complementario',
  templateUrl: './estudio-complementario.component.html',
  styleUrls: ['./estudio-complementario.component.scss']
})
export class EstudioComplementarioComponent implements OnInit , OnDestroy {
  subscripciones = [];

  @Input() consejeriaId: string;
  estudioComplementario: EstudioComplementario;
  
  constructor(private consejeriaService: ConsejeriasHttpService, private router: Router) { }

  ngOnInit() {
    if(this.consejeriaId !='' && this.consejeriaId != 'new'){
      let estudio = null;
      this.subscripciones.push(this.consejeriaService.getEstudioByConsejeriaId(this.consejeriaId).subscribe(estudioRequest => 
        {
          estudio = estudioRequest;
          if(!estudio){
            this.inicializar(this.consejeriaId);
          }else{
            this.estudioComplementario = estudio;
          }
        }));
    }
    else{
      this.inicializar(this.consejeriaId);
    }
    
  }

  inicializar(consejeriaId: string){
    this.estudioComplementario = new EstudioComplementario('','',new Date(), '', false, 0, false, '', false, false, false, '', new Date(), '', false, 0, false, '', false, false, false, 
    new Date(), '', '', '','', '', '', consejeriaId, new Date());
  }

  guardarEstudioComplementario(form: any) {
    if(this.consejeriaId != '' && this.estudioComplementario.id != ''){
      this.subscripciones.push(this.consejeriaService.updateEstudio(this.estudioComplementario).subscribe(
        (estudio) => {this.estudioComplementario = estudio}
      )); 
   }else{
    this.subscripciones.push(this.consejeriaService.insertEstudio(this.estudioComplementario).subscribe(
      (estudio) => {this.estudioComplementario = estudio}
    )); 
   }
  }
  cancelarEdicionEstudioComplementario() {
    this.router.navigate(['consejerias']);
  }

  ngOnDestroy() {
    this.subscripciones.forEach(s => s.unsubscribe())
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { Otro } from '../../models/consejeria.model';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import {TipoViolencia } from '../../models/enumeradores';
@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.scss']
})
export class OtrosComponent implements OnInit {
  @Input() consejeriaId: string;
  otro: Otro;
  tipos = [];
  constructor(private consejeriaService: ConsejeriasHttpService) { }

  ngOnInit() {
    this.tipos.push({ id :TipoViolencia.Economica, nombre: 'Economica'});
    this.tipos.push({ id :TipoViolencia.Fisica, nombre: 'Fisica'});
    this.tipos.push({ id :TipoViolencia.Psicologica, nombre: 'Psicologica'});
    this.tipos.push({ id :TipoViolencia.Sexual, nombre: 'Sexual'});
    this.tipos.push({ id :TipoViolencia.Simbolica, nombre: 'Simbolica'});
    
    if(this.consejeriaId != ''){
      let ante = null;
      this.consejeriaService.getOtrosByConsejeriaId(this.consejeriaId).pipe(take(1)).subscribe(otroRequest => 
        {
          ante = otroRequest;
          if(!ante){
            this.inicializar(this.consejeriaId);
          }else{
            this.otro = ante;
          }
        });
    }
    else{
      this.inicializar(this.consejeriaId);
    }
    
  }

  inicializar(consejeriaId: string){
    this.otro =  new Otro('',false, 0, '',false, '', '', false, '', '', false, false, false, false, false, '', consejeriaId, new Date());
  }
  guardarOtro(form: any) {
    if(this.consejeriaId != '' && this.otro.id  != ''){
      this.consejeriaService.updateOtro(this.otro).subscribe(
        (antece) => {this.otro = antece}
      ); 
   }else{
    this.consejeriaService.insertOtro(this.otro).subscribe(
      (antece) => {this.otro = antece}
    ); 
   }
  }
  cancelarOtro() {

  }
}

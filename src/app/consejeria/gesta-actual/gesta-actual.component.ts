import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { GestaActual } from '../../models/consejeria.model';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-gesta-actual',
  templateUrl: './gesta-actual.component.html',
  styleUrls: ['./gesta-actual.component.scss']
})
export class GestaActualComponent implements OnInit , OnDestroy {
  subscripciones = [];

  @Input() consejeriaId: string;
  gestaActual: GestaActual;
  
  constructor(private consejeriaService: ConsejeriasHttpService,private router: Router) { }

  ngOnInit() {
    if(this.consejeriaId != ''){
      let gesta = null;
      this.subscripciones.push(this.consejeriaService.getGestasByConsejeriaId(this.consejeriaId).subscribe(gestaRequest => 
        {
          gesta = gestaRequest;
          if(!gesta){
            this.inicializar(this.consejeriaId);
          }else{
            this.gestaActual = gesta;
          }
        }));
    }
    else{
      this.inicializar(this.consejeriaId);
    }
    
  }

  inicializar(consejeriaId: string){
    this.gestaActual = new GestaActual('',false,'',new Date(),new Date(),'',false,'',false,'',false,false,false,false,'',false,false,false,false,false,false,false,false,false,false,'', '', consejeriaId);
  }

  guardarGestaActual(form: any) {
    if(this.consejeriaId != '' && this.gestaActual.id != ''){
      this.subscripciones.push(this.consejeriaService.updateGestaActual(this.gestaActual).subscribe(
        (gesta) => {
          this.gestaActual = gesta;
        }
      )); 
   }else{
    this.subscripciones.push(this.consejeriaService.insertGestaActual(this.gestaActual).subscribe(
      (gesta) => {
        this.gestaActual = gesta;
      }
    )); 
   }
  }
  cancelarEdicionGestaActual() {
    this.router.navigate(['consejerias']);
  }

  ngOnDestroy() {
    this.subscripciones.forEach(s => s.unsubscribe())
  }
}

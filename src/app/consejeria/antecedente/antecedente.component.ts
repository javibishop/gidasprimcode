import { Component, OnInit, Input } from '@angular/core';
import { Antecedente } from '../../models/consejeria.model';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';

@Component({
  selector: 'app-antecedente',
  templateUrl: './antecedente.component.html',
  styleUrls: ['./antecedente.component.scss']
})
export class AntecedenteComponent implements OnInit {
  @Input() consejeriaId: string;
  antecedente: Antecedente;

  constructor(private consejeriaService: ConsejeriasHttpService) { }

  ngOnInit() {
    if(this.consejeriaId != ''){
      let ante = null;
      this.consejeriaService.getAntecedenteByConsejeriaId(this.consejeriaId).subscribe(antecedenteRequest => 
        {
          ante = antecedenteRequest;
          if(!ante){
            this.inicializar(this.consejeriaId);
          }else{
            this.antecedente = ante;
          }
        });
    }
    else{
      this.inicializar(this.consejeriaId);
    }
    
  }

  inicializar(consejeriaId: string){
    this.antecedente =  new Antecedente('',0,0,0,0,0,false,false,false,false,false,false,false,false,0,'',consejeriaId, new Date(), '');
  }

  guardarAntecedente(form: any) {
    if(this.consejeriaId != '' && this.antecedente.id  != ''){
      this.consejeriaService.updateAntecedente(this.antecedente).subscribe(
        (antece) => {this.antecedente = antece}
      ); 
   }else{
    this.consejeriaService.insertAntecedente(this.antecedente).subscribe(
      (antece) => {this.antecedente = antece}
    ); 
   }
  }
  cancelarEdicionAntecedente() {

  }
}

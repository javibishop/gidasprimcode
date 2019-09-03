import { Component, OnInit, Input } from '@angular/core';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { EstudioComplementario } from '../../models/consejeria.model';

@Component({
  selector: 'app-estudio-complementario',
  templateUrl: './estudio-complementario.component.html',
  styleUrls: ['./estudio-complementario.component.scss']
})
export class EstudioComplementarioComponent implements OnInit {

  @Input() consejeriaId: string;
  estudioComplementario: EstudioComplementario;
  
  constructor(private consejeriaService: ConsejeriasHttpService) { }

  ngOnInit() {
    if(this.consejeriaId !=''){
      let estudio = null;
      this.consejeriaService.getEstudioByConsejeriaId(this.consejeriaId).subscribe(estudioRequest => 
        {
          estudio = estudioRequest;
          if(!estudio){
            this.inicializar(this.consejeriaId);
          }else{
            this.estudioComplementario = estudio;
          }
        });
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
      this.consejeriaService.updateEstudio(this.estudioComplementario).subscribe(
        (estudio) => {this.estudioComplementario = estudio}
      ); 
   }else{
    this.consejeriaService.insertEstudio(this.estudioComplementario).subscribe(
      (estudio) => {this.estudioComplementario = estudio}
    ); 
   }
  }
  cancelarEdicionEstudioComplementario() {

  }
}

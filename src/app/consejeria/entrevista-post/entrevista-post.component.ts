import { Component, OnInit, Input } from '@angular/core';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { EntrevistaPostAborto } from '../../models/consejeria.model';

@Component({
  selector: 'app-entrevista-post',
  templateUrl: './entrevista-post.component.html',
  styleUrls: ['./entrevista-post.component.scss']
})
export class EntrevistaPostComponent implements OnInit {

  @Input() consejeriaId: string;
  entrevista: EntrevistaPostAborto;

  constructor(private consejeriaService: ConsejeriasHttpService) { }

  ngOnInit() {
    if(this.consejeriaId != ''){
      let ante = null;
      this.consejeriaService.getEntrevistaByConsejeriaId(this.consejeriaId).subscribe(antecedenteRequest => 
        {
          ante = antecedenteRequest;
          if(!ante){
            this.inicializar(this.consejeriaId);
          }else{
            this.entrevista = ante;
          }
        });
    }
    else{
      this.inicializar(this.consejeriaId);
    }
    
  }

  inicializar(consejeriaId: string){
    this.entrevista =  new EntrevistaPostAborto('',new Date(),'',false,false,false,'',false,false,'',false,false,'',false,false,false,false,false,false,false,false,
    false,false,false,'',false,false,false,'',false,new Date(),false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, consejeriaId);
  }

  guardarEntrevista(form: any) {
    if(this.consejeriaId != '' && this.entrevista.id != ''){
      this.consejeriaService.updateEntrevista(this.entrevista).subscribe(
        (entre) => {this.entrevista = entre}
      ); 
   }else{
    this.consejeriaService.insertEntrevista(this.entrevista).subscribe(
      (entre) => {this.entrevista = entre}
    ); 
   }
  }
  cancelarEdicionEntrevista() {

  }
}
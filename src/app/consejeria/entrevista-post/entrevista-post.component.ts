import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { EntrevistaPostAborto } from '../../models/consejeria.model';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-entrevista-post',
  templateUrl: './entrevista-post.component.html',
  styleUrls: ['./entrevista-post.component.scss']
})
export class EntrevistaPostComponent implements OnInit , OnDestroy {
  subscripciones = [];

  @Input() consejeriaId: string;
  entrevista: EntrevistaPostAborto;

  constructor(private consejeriaService: ConsejeriasHttpService, private router: Router) { }

  ngOnInit() {
    if(this.consejeriaId != '' && this.consejeriaId != 'new'){
      let ante = null;
      this.subscripciones.push(this.consejeriaService.getEntrevistaByConsejeriaId(this.consejeriaId).subscribe(antecedenteRequest => 
        {
          ante = antecedenteRequest;
          if(!ante){
            this.inicializar(this.consejeriaId);
          }else{
            this.entrevista = ante;
          }
        }));
    }
    else{
      this.inicializar(this.consejeriaId);
    }
    
  }

  inicializar(consejeriaId: string){
    this.entrevista =  new EntrevistaPostAborto('',new Date(),'',false,false,false,'',false,false,'',false,false,'',false,false,false,false, false,false,false,false,false,
    false,false,false,'',false,false,false,'',false,new Date(),false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, consejeriaId);
  }

  guardarEntrevista(form: any) {
    if(this.consejeriaId != '' && this.entrevista.id != ''){
      this.subscripciones.push(this.consejeriaService.updateEntrevista(this.entrevista).subscribe(
        (entre) => {this.entrevista = entre}
      )); 
   }else{
    this.subscripciones.push(this.consejeriaService.insertEntrevista(this.entrevista).subscribe(
      (entre) => {this.entrevista = entre}
    )); 
   }
  }
  cancelarEdicionEntrevista() {
    this.router.navigate(['consejerias']);
  }

  ngOnDestroy() {
    this.subscripciones.forEach(s => s.unsubscribe())
  }
}
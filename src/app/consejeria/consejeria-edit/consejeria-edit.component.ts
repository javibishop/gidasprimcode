import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Consejeria } from '../../models/consejeria.model';
import { UsuarieHttpService } from '../../services/usuarie-http.service';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { StateService } from '../../services/state.service';
import { Usuarie } from '../../models/usuarie.model';
import { Usuaria } from 'src/app/models/usuaria.model';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'src/app/confirm/confirm.component';

@Component({
  selector: 'app-consejeria-edit',
  templateUrl: './consejeria-edit.component.html',
  styleUrls: ['./consejeria-edit.component.scss']
})
export class ConsejeriaEditComponent implements OnInit {

  consejeria: Consejeria;
  usuaries: Usuarie[];
  usuariaId: string;
  usuarie1Id: string;
  usuarie2Id: string;
  id: string;
  usuaria : Usuaria;
  constructor(
    private usuarieService: UsuarieHttpService,
    private consejeriasData: ConsejeriasHttpService, //ConsejeriasArrayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.stateService.usuaries$.subscribe(usuaries => this.usuaries = usuaries);
    if(this.usuaries.length == 0){
      this.usuarieService.getAll();
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    /*cuando me llega la data la asigno al consejeria */
    if(this.id != '' && this.id != 'new'){
      this.consejeriasData.getById(this.id).subscribe(consejeria => {
        this.consejeria = consejeria;
        this.usuarie1Id = consejeria.usuarie1Id.id;
        this.usuarie2Id = consejeria.usuarie2Id.id;
        this.usuaria = consejeria.usuariaId;
      }); 
      
    }
    else{
      this.consejeria = new Consejeria('',0 ,new Date(),'' , null, null, null);
    }
    /*aca puede que sea nul cuando se muestra la pantalla y da un error , entonces en el html se pone el *ngIf="consejeria" para que se muestre cuando el valor esta
    asignado al alumnno */

    this.stateService.setAppTitulo('Edicion de consejeria');
  }

  openDialog(mensaje: string) {
    this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {titulo: "Advertencia", mensaje: mensaje}
    });
  }

  guardar(form: any) {
    if(this.consejeria._id != ''){
       
        if(this.consejeria.usuarie1Id.id != this.usuarie1Id){
          this.consejeria.usuarie1Id = this.usuaries.find((u) => u.id == this.usuarie1Id);
        }
        if(this.consejeria.usuarie2Id.id != this.usuarie2Id){
          this.consejeria.usuarie2Id = this.usuaries.find((u) => u.id == this.usuarie2Id);
        }
        this.consejeriasData.update(this.consejeria).subscribe((_) => this.router.navigate(['consejerias']));
         /*si aca no hago subscribe no se ejecuta el update. Ademas falta (JS tiene un solo hilo de ejecucion). Entonces
        cuando el hilo quede libre tengo que navegar a la ruta de consejerias, sino no se ve ya que es asincronico.)
        (_) es para indicar que tiene un parametro vacio*/  
      }else{
        if(this.usuaria){
          this.consejeria.usuariaId = this.usuaria;
          this.consejeria.usuarie1Id = this.usuaries.find((u) => u.id == this.usuarie1Id);
          this.consejeria.usuarie2Id = this.usuaries.find((u) => u.id == this.usuarie2Id);
          this.consejeriasData.insert(this.consejeria).subscribe((_) => this.router.navigate(['consejerias']));
        }else{
          this.openDialog("Primero debe grabar los datos de la Usuaria");
        }
      }
      
      //this.router.navigate(['consejerias']);
  }

  //evento que se ejecuto en el component de usuaria al hacer inserte de una usaria y devuelve el id.
  usuariaInserted(usuaria: Usuaria) {
    this.usuaria = usuaria;
    this.openDialog("Ya puede grabar la Consejeria!.");
  }

  cancelarEdicion() {
    this.router.navigate(['consejerias']);
  }

}

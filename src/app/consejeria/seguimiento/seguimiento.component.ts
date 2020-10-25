import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Consejeria, SeguimientoConsejeria } from '../../models/consejeria.model';
import { ConsejeriasHttpService } from '../../services/consejerias-http.service';
import { MatDialog } from '@angular/material/dialog';
import { TextboxModalComponent } from 'src/app/textbox.modal/textbox.modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {
  @Input() consejeria: Consejeria;
  seguimiento: SeguimientoConsejeria;

  constructor(private consejeriaService: ConsejeriasHttpService, public dialog: MatDialog, private router: Router) { }
  ngOnInit() {
  }

  getUsuarieLogin(){
    let data = localStorage.getItem('currentUsuarie');
    return JSON.parse(data).usuarioDB._id;
  }
  nuevoseguimiento(){
    this.getUsuarieLogin();
    this.seguimiento = {fecha: new Date(), observacion: '', usuarieId: this.getUsuarieLogin(), _id: null}; 
    this.modalSeguimientoObservacion('nuevo');
  }
  editarseguimiento(seguimiento){
    this.seguimiento = seguimiento;
    this.modalSeguimientoObservacion('editar');
  }

  eliminarseguimiento(seguimiento){
    this.seguimiento = seguimiento;
    this.guardarSeguimiento('eliminar');
  }
  guardarSeguimiento(accion){
    if(this.consejeria.seguimiento === undefined){
      this.consejeria.seguimiento = [];
    }
    switch(accion){
      case 'editar':
        if(this.seguimiento._id !== undefined && this.seguimiento._id !== null){
          const index = this.consejeria.seguimiento.findIndex(s => s._id === this.seguimiento._id);
          if(index > -1){
            this.seguimiento.usuarieId = this.getUsuarieLogin();
            this.consejeria.seguimiento[index] = this.seguimiento;
          }
        }
        break;
      case 'nuevo':
        this.consejeria.seguimiento.push(this.seguimiento);
        break;
      case 'eliminar':
        const index = this.consejeria.seguimiento.findIndex(s => s._id === this.seguimiento._id);
        if(index > -1){
          this.consejeria.seguimiento.splice(index, 1);
        }
        break;
      }
      this.consejeriaService.update(this.consejeria).subscribe(result => {
      //console.log(result);
    });
  }

  
  modalSeguimientoObservacion(accion){
		const dialogRef = this.dialog.open(TextboxModalComponent, {
            height: '200px',
            width: '500px',
            data: {texto: this.seguimiento.observacion, titulo:'Observacion del Seguimiento', placeHolder:'Ingrese el comentario para generar el seguimiento!.'}
            }
        );

        dialogRef.afterClosed().subscribe(result => {
          if(result.result === true){
            this.seguimiento.observacion = result.data;
            this.guardarSeguimiento(accion);
         }
        });
	  }
}
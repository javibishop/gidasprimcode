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
    this.nuevoseguimiento();
  }

  cancelarOtro() {
    //this.router.navigate(['consejerias']);
  }

  nuevoseguimiento(){
    this.seguimiento = {fecha: new Date(), observacion: '', usuarieId: ''};
  }
  editarseguimiento(seguimiento){
    this.seguimiento = seguimiento;
  }

  guardarSeguimiento(){
    if(this.consejeria.seguimiento === undefined){
      this.consejeria.seguimiento = [];
    }
    this.consejeria.seguimiento.push(this.seguimiento);
    this.consejeriaService.update(this.consejeria).subscribe(result => {
      console.log(result);
    });
  }
}
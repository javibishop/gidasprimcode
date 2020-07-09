
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Especialidad } from '../../models/especialidad.model';
import { EspecialidadHttpService } from '../../services/especialidad-http.service';
import { StateService } from '../../services/state.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-especialidad-edit',
  templateUrl: './especialidad-edit.component.html',
  styleUrls: ['./especialidad-edit.component.scss']
})
export class EspecialidadEditComponent implements OnInit {

  especialidad: Especialidad;

  constructor(
    private especialidadsData: EspecialidadHttpService, //EspecialidadsArrayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateService: StateService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    /*cuando me llega la data la asigno al especialidad */
    if(id !== '')
      this.especialidadsData.getById(id).subscribe(especialidad => this.especialidad = especialidad); 
    else{
      this.especialidad = new Especialidad('', '');
    }
    /*aca puede que sea nul cuando se muestra la pantalla y da un error , entonces en el html se pone el *ngIf="especialidad" para que se muestre cuando el valor esta
    asignado al alumnno */

    this.stateService.setAppTitulo('Edicion de especialidad');
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  guardar(form: any) {
    
      if(this.especialidad.id !== ''){
        this.especialidadsData.update(this.especialidad).subscribe(
          (_) => this.router.navigate(['especialidades'])
        ); /*si aca no hago subscribe no se ejecuta el update. Ademas falta (JS tiene un solo hilo de ejecucion). Entonces
        cuando el hilo quede libre tengo que navegar a la ruta de especialidads, sino no se ve ya que es asincronico.)
        (_) es para indicar que tiene un parametro vacio*/  
      }else{
        this.especialidadsData.insert(this.especialidad).subscribe(
          (_) => this.router.navigate(['especialidades'])
        ); /*si aca no hago subscribe no se ejecuta el update. Ademas falta (JS tiene un solo hilo de ejecucion). Entonces
        cuando el hilo quede libre tengo que navegar a la ruta de especialidads, sino no se ve ya que es asincronico.)
        (_) es para indicar que tiene un parametro vacio*/
      }
  }

  cancelarEdicion() {
    this.router.navigate(['especialidades']);
  }

}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

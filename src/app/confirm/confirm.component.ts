import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  titulo: string;
  mensaje: string;
  result: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'confirm.component',
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.scss'],
})

export class ConfirmComponent {
  title = 'Angular-Interceptor';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public reference : MatDialogRef<ConfirmComponent>
  ) {

  }
  
  // onNoClick(): void {
  //       this.dialogRef.close();
  //     }

  close(){
    this.reference.close();
  }
  
}


// export class ConfirmComponent {

//   titulo: string;
//   mensaje: string;
//   result: string;

//   constructor(public dialog: MatDialog) {}
//   @Inject(MAT_DIALOG_DATA) public data: any,
//     public reference : MatDialogRef<ConfirmComponent>
//   // openDialog(): void {
//   //   const dialogRef = this.dialog.open(ConfirmComponent, {
//   //     width: '250px',
//   //     data: {titulo: this.titulo, mensaje: this.mensaje}
//   //   });

//   //   dialogRef.afterClosed().subscribe(result => {
//   //     console.log('The dialog was closed');
//   //     this.result = result;
//   //   });
//   // }

// }

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

// }
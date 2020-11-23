import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../confirm/confirm.component';

@Component({
  selector: 'app-textbox-modal',
  templateUrl: './textbox.modal.component.html',
  styleUrls: ['./textbox.modal.component.scss']
})
export class TextboxModalComponent implements OnInit {
  texto = '';
  titulo = '';
  placeHolder = '';
  constructor( public dialogRef: MatDialogRef<TextboxModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.texto = this.data.texto;
    this.titulo = this.data.titulo;
    this.placeHolder = this.data.placeHolder;
  }

  ngOnInit(): void {
  }

  cerrar(): void {
    this.dialogRef.close({result:false});
  }

  guardar() {
    if (this.texto !== '') {
        this.dialogRef.close({result:true, data: this.texto});
    }
  }
}

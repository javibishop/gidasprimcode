import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorDialogComponent } from '../error/errordialog.component';

@Injectable({
    providedIn: 'root'
  })
export class ErrorDialogService {

    constructor(public dialog: MatDialog) { }
    openDialog(data): void {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            height: '200px',
            width: '400px',
            data: data
            }
        );

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            let animal;
            animal = result;
        });
    }
}
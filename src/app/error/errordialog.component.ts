import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.scss']
})

export class ErrorDialogComponent {
  title = 'Angular-Interceptor';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public reference : MatDialogRef<ErrorDialogComponent>
  ) {

  }
  
  close(){
    this.reference.close();
  }
  
}


/* https://material.angular.io/components/dialog/overview */
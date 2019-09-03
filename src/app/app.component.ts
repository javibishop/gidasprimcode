import { Component } from '@angular/core';
import { AuthenticationService } from '../app/services/authentication.service';
import { Usuarie } from '../app/models/usuarie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: Usuarie;
  title = 'Curso Angular 7 del MUG!';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUsuarie.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  } 
}



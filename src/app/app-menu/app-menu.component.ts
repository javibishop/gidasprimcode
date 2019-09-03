import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '../services/state.service';
import { AuthenticationService } from '../../app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent {
  titulo = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private stateService: StateService,  private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.stateService.appTitulo$.subscribe(titulo => this.titulo = titulo);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  } 
}

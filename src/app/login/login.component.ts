import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { StateService } from '../services/state.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';


@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    username: string;
    password: string;
    subscripciones = [];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private stateService: StateService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }

        this.stateService.setAppTitulo('Ingreso al sistema');
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/consejerias';
    }

    ngOnDestroy() {
        this.subscripciones.forEach(s => s.unsubscribe())
    }
    onSubmit(form: any, valid: any) {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();
        this.loading = true;
        this.subscripciones.push(this.authenticationService.login(this.username, this.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }));
    }
}


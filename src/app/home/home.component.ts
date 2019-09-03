import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../app/services/authentication.service';
import { Usuarie } from '../../app/models/usuarie.model';
import { StateService } from '../../app/services/state.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    userName: String;
    constructor(
        private authenticationService: AuthenticationService,
        private stateService: StateService
    ) {
        this.userName = this.authenticationService.currentUserName;
    }

    ngOnInit() {
        //this.loadAllUsers();
    }
}
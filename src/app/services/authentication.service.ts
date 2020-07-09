import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuarie } from '../models/usuarie.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUsuarieSubject: BehaviorSubject<Usuarie>;
    public currentUsuarie: Observable<Usuarie>;
    private url = environment.baseUrl + 'login';
    constructor(private http: HttpClient) {
        this.currentUsuarieSubject = new BehaviorSubject<Usuarie>(JSON.parse(localStorage.getItem('currentUsuarie')));
        this.currentUsuarie = this.currentUsuarieSubject.asObservable();
    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }
    public get currentUserValue(): Usuarie {
        return this.currentUsuarieSubject.value;
    }

    public get currentUserName(): String {
        return this.currentUsuarieSubject.value.nombre;
    }

    login(username, password) {
        return this.http.post<any>(`${this.url}`, { username, password })
            .pipe(map(dataUsuarieDB => {
                // store Usuarie details and jwt token in local storage to keep Usuarie logged in between page refreshes
                localStorage.setItem('currentUsuarie', JSON.stringify(dataUsuarieDB));
                this.currentUsuarieSubject.next(dataUsuarieDB);
                return dataUsuarieDB;
            }));
    }

    logout() {
        // remove Usuarie from local storage and set current Usuarie to null
        localStorage.removeItem('currentUsuarie');
        this.currentUsuarieSubject.next(null);
    }
}
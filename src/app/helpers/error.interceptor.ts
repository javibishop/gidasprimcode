import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }else{
                if (err.error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.err.message);
                } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                      }
                // if (err.error instanceof Error) {
                //     // A client-side or network error occurred. Handle it accordingly.
                //     console.error('An error occurred:', err.error.error.message);
                //   } else {
                //     // The backend returned an unsuccessful response code.
                //     // The response body may contain clues as to what went wrong,
                //     console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
                //   }
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
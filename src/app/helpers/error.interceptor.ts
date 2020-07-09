import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogService } from '../services/errordialog.service'; 
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private errorDialogService: ErrorDialogService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            else if(err.status === 500 || err.status === 501) {
                let mensaje: string [] = [];
                //proceso los mensajes.
                if(!err.error.ok){
                    if(err.status === 500){
                        for (var prop in err.error.err.errors) {
                            if (Object.prototype.hasOwnProperty.call(err.error.err.errors, prop)) {
                                mensaje.push(err.error.err.errors[prop].message);
                            }
                        }
                    }else if(err.status === 501){
                        mensaje.push(err.error.err.message);
                    }
                }
                let data = {reason: mensaje, status:err.status, titulo: "Informacion"};
                this.errorDialogService.openDialog(data);
                return throwError(data.reason);
            }
            else{
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
            // let data = {
            //     reason: error && error.error && error.error.reason ? error.error.reason : '',
            //     status: error.status
            // };
            
        }));
    }
}
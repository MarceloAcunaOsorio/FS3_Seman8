import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
     catchError(err => {

      if (err.status === 401) {  
       // Redirigir al login o mostrar un mensaje de error
       console.error('No autorizado: Token inválido o ausente');
      }
      return throwError(() => new Error(err));;
     })
    );
   }
  constructor() { }
}


@Injectable({

  providedIn: 'root'
 
 })
 
 export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/login';
  constructor(private readonly http: HttpClient) {}
  login(credentials: { email: string; password: string }) {
  return this.http.post<{ token: string }>(this.apiUrl, credentials)
  .pipe(
      tap(response => {
 
      // Guardar el token en localStorage
 
      localStorage.setItem('authToken', response.token);})
    );
  }
 
 
 
  logout() {
 
   // Eliminar el token al cerrar sesión
 
   localStorage.removeItem('authToken');
 
  }
 
 }
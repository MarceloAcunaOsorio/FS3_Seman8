import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../../models/usuario';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class UsuarioService {

  private readonly ApiUrl = "http://localhost:8085/api/register"
  
  constructor(private readonly http:HttpClient) { }


//crear usuario
/*
createUsuario(usuario:usuario):Observable<usuario>{
return this.http.post<usuario>(this.ApiUrl, usuario)
}*/



  //crear producto
  createUsuario(usuario: usuario): Observable<usuario> {
    const formData = new FormData()
    formData.append(`usuario`, new Blob([JSON.stringify(usuario)], { type: 'application/json' }));

    console.log('Datos en el servicio:', usuario);
    return this.http.post<usuario>(this.ApiUrl, usuario)
  }


}



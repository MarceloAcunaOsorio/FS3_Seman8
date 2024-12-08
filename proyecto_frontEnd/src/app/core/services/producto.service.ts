import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { producto } from '../../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8083/api/productos';

  constructor(private http: HttpClient) { }

  //listar producto
  private apUrl = 'http://localhost:8083/api/home';
  getProducto(): Observable<producto[]> {
    return this.http.get<producto[]>(`${this.apUrl}`)
  }


  //id del producto
  getProductoById(_idProducto: number): Observable<producto> {
    return this.http.get<producto>(`${this.apiUrl}/${_idProducto}`);
  }


  //crear producto

  createProducto(producto: any) {
    return this.http.post(`${this.apiUrl}`, producto);
  }
  /*private apUrl = 'http://localhost:8085/admin/crearproducto'
  createProducto(producto: producto): Observable<producto> {
    const formData = new FormData()
    formData.append(`producto`, new Blob([JSON.stringify(producto)], { type: 'application/json' }));

    console.log('Datos en el servicio:', producto);
    return this.http.post<producto>(this.apUrl, producto)
  }*/






  //Actualizar producto
  updateProducto(_idProducto: number, producto: any) {
    return this.http.put(`${this.apiUrl}/${_idProducto}`, producto);
  }
  
  /*private apUrls = 'http://localhost:8085/admin/actualizar'
  updateProducto(producto: producto) {
    return this.http.put(this.apUrls, producto)
  }*/






  //eliminar producto

  deleteProducto(_idProducto: number,token: string):Observable<any> {

    // Set up the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the DELETE request with the headers
    return this.http.delete(`${this.apiUrl}/eliminar/${_idProducto}`, { headers });
  }
  /*private apUr = 'http://localhost:8085/admin/eliminar'
  deleteProducto(_idProducto: number) {
    return this.http.delete<producto>(`${this.apUr}/${_idProducto}`);
  }*/
}

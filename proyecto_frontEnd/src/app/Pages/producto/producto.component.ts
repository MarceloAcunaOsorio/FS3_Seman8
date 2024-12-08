import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { producto } from '../../models/producto';
import { ProductoService } from '../../core/services/producto.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterModule,HttpClientModule, ButtonModule,CardModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {


  producto: producto[] = []

  constructor(private productoService: ProductoService){}

 ngOnInit():void{
  this.getAllProductos();
 }

 //funcion para obtener todos los productos
 getAllProductos(){
  this.productoService.getProducto().subscribe((data)=> {
    this.producto = data;
  });
 }
}

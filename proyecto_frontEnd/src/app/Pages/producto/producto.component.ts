import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { producto } from '../../models/producto';
import { ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterModule,CardModule,ButtonModule],
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

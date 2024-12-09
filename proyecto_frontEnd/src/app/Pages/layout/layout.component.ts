import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { producto } from '../../models/producto';
import { ProductoService } from '../../core/services/producto.service';
import { ButtonModule } from 'primeng/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule} from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, ButtonModule, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

  producto: producto[] = []
  isDeleteInProgress: boolean = false;

  constructor(private readonly productoService: ProductoService,
    private readonly _matDialog: MatDialog,
    private readonly authService: AuthService,
    private readonly messageService: MessageService) { }


  ngOnInit(): void {
    this.getAllProductos();
  }

  //funcion para obtener todos los productos
  getAllProductos() {
    this.productoService.getProducto().subscribe({
      next: (response: producto[]) => {
        this.producto = response; // Correctly handle response as Producto[]
      },
      error: (error) => {
        console.error('Error fetching productos:', error); // Handle the error properly
      }
    });
  }
  /*getAllProductos() {
    this.productoService.getProducto().subscribe((response: producto[]) => {
        this.producto = response; // Correctly handle response as Producto[]
      },
      (error) => {
        console.error('Error fetching productos:', error);
      }
    );
  }*/


  eliminarProducto(_IdProducto: number) {
    this.isDeleteInProgress = true;
    
      // Retrieve the token from localStorage (you can adjust this depending on where it's stored)
      const token = localStorage.getItem('authToken');
    
      if (!token) {
        this.messageService.add({
         severity: 'error',
         summary: 'Error',
         detail: 'Token de acceso no disponible.',
        });
    this.isDeleteInProgress = false;
    return;}
    
    // Call the service to delete the product, passing the token in the headers
    this.productoService.deleteProducto(_IdProducto, token).subscribe({
    next: () => {this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Producto eliminado correctamente',
          });
          this.isDeleteInProgress = false;
          this.getAllProductos();  // Refresh the product list
        },
    error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto',
          });
        },
      });
    }
}

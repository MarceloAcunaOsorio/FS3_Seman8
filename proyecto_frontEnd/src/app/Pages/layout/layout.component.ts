import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { producto } from '../../models/producto';
import { ProductoService } from '../../core/services/producto.service';
import { ButtonModule } from 'primeng/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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

  constructor(private productoService: ProductoService,
    private _matDialog: MatDialog,
    private authService: AuthService,
    private messageService: MessageService) { }


  ngOnInit(): void {
    this.getAllProductos();
  }

  //funcion para obtener todos los productos
  getAllProductos() {
    this.productoService.getProducto().subscribe((data) => {
      this.producto = data;
    });
  }


  eliminarProducto(_IdProducto: number) {

    this.isDeleteInProgress = true;

    this.productoService.deleteProducto(_IdProducto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'correcto',
          detail: 'Libro eliminado correctamente',
        });
        this.isDeleteInProgress = false;
        this.getAllProductos();
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

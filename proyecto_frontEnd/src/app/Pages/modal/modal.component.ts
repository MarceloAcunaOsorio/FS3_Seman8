import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router} from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ToastModule } from "primeng/toast"




@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HeaderComponent,
    ButtonModule,
    FooterComponent,
    ToastModule,
    InputNumberModule,
    InputTextModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export default class ModalComponent {
  productoForm!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedFile: File | null = null;
  _idProducto: number = 0
  


  constructor(
    private readonly fb: FormBuilder,
    private readonly productservice: ProductoService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {
    this.productoForm = this.fb.group({
      _IdProducto: [null],
      _NombreProducto: ['', Validators.required],
      _DescripcionProducto: ['', Validators.required],
      _ModeloProducto: ['', Validators.required],
      _MarcaProducto: ['', Validators.required],
      _ColorProducto: ['', Validators.required],
      _TallaProducto: [1, [Validators.required, Validators.min(1)]]
    });

  }

  ngOnInit(): void {
    let _IdProducto = this.activatedRoute.snapshot.paramMap.get('_IdProducto');
    if (_IdProducto !== 'new') {
      this.edit = true;
      this.getProductById(+_IdProducto!);
    }
  }

  
  //traer el producto por ID
  getProductById(_IdProducto: number) {
    // Retrieve the token from localStorage (or wherever it's stored)
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Token de acceso no disponible.',
      });
      this.router.navigateByUrl('/');  // Navigate to another route if the token is missing
      return;
    }
  
    // Call the service to get the product by ID, passing the token in the headers
    this.productservice.getProductoById(_IdProducto, token).subscribe({
      next: (foundProducto) => {
        this.productoForm.patchValue(foundProducto); // Populate the form with the found product data
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se encontró el producto',
        });
        this.router.navigateByUrl('/');  // Navigate if an error occurs
      },
    });
  }













  //metodo crea producto
  createProducto() {

    if (this.productoForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;


    // Retrieve the token from localStorage (or wherever it is stored)
    const token = localStorage.getItem('authToken');

    if (!token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Token de acceso no disponible.',
      });
      this.isSaveInProgress = false;
      return;
    }

    // Call the service to create the product, passing the token in the headers
    this.productservice.createProducto(this.productoForm.value, token).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Producto guardado correctamente',
        });

        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');  // Navigate to the home page or another route
      },


      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente',
        });
      },
    });
  }














//Actualizar producto
  updateProducto() {
    if (this.productoForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
  
    // Retrieve the token from localStorage (or wherever it is securely stored)
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Token de acceso no disponible.',
      });
      this.isSaveInProgress = false;
      return;
    }
  
    // Call the service to update the product, passing the token in the headers
    this.productservice.updateProducto(this.productoForm.value._IdProducto, this.productoForm.value, token).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Producto actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/'); // Navigate to home or another page
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente',
        });
      },
    });
  }

}

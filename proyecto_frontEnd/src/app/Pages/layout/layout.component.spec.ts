import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoService } from '../../core/services/producto.service';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import LayoutComponent from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let productoService: jasmine.SpyObj<ProductoService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const productoServiceSpy = jasmine.createSpyObj('ProductoService', ['getProducto', 'deleteProducto']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [
        ButtonModule,
        RouterModule,
        HttpClientModule,
        ToastModule,
        HeaderComponent,
        FooterComponent,
        CommonModule
      ],
      declarations: [LayoutComponent],
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    // Configurar productos de ejemplo
    productoService.getProducto.and.returnValue(of([{ _IdProducto: 50, _NombreProducto: 'Producto 1',_DescripcionProducto:'asdasd',_ModeloProducto:'dedede',_MarcaProducto:'dscdsc', _TallaProducto: 100,_ColorProducto:'dcwec' }]));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllProductos and populate the producto array', () => {
    component.ngOnInit();

    // Verificar que el servicio se haya llamado
    expect(productoService.getProducto).toHaveBeenCalled();
    // Verificar que el array de productos se haya llenado correctamente
    expect(component.producto.length).toBeGreaterThan(0);
  });

  it('should call eliminarProducto and delete a product successfully', () => {

    const mockProduct = { 
      _IdProducto: 1, 
      _NombreProducto: 'Producto 1', 
      _DescripcionProducto: 'Descripcion', 
      _ModeloProducto: 'Modelo', 
      _MarcaProducto: 'Marca', 
      _ColorProducto: 'Rojo', 
      _TallaProducto: 1 
    };

    // Simulando una respuesta exitosa de la eliminación del producto
    productoService.deleteProducto.and.returnValue(of(mockProduct));

    component.eliminarProducto(1);

    // Verificar que se haya llamado al método deleteProducto
    expect(productoService.deleteProducto).toHaveBeenCalledWith(1);
    // Verificar que se haya mostrado el mensaje de éxito
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'correcto',
      detail: 'Libro eliminado correctamente',
    });
  });

  it('should call eliminarProducto and handle error during deletion', () => {
    // Simulando un error en la eliminación del producto
    productoService.deleteProducto.and.returnValue(throwError('Error en la eliminación'));

    component.eliminarProducto(1);

    // Verificar que se haya llamado al método deleteProducto
    expect(productoService.deleteProducto).toHaveBeenCalledWith(1);
    // Verificar que se haya mostrado el mensaje de error
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar el producto',
    });
  });
});
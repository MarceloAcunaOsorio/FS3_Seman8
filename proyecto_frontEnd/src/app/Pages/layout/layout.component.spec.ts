import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoService } from '../../core/services/producto.service';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import LayoutComponent from './layout.component';

// Mock Services
class MockProductoService {
  getProducto() {
    return of([{ _IdProducto: 1, _NombreProducto: 'Test Producto' }]);
  }
  deleteProducto(_IdProducto: number, token: string) {
    return of({});
  }
}

class MockAuthService {
  // Mock any necessary methods here
}

class MockMessageService {
  add(message: any) {
    console.log('Message:', message);
  }
}

class MockMatDialog {
  open() {
    return { afterClosed: () => of(true) };
  }
}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let productoService: ProductoService;
  let authService: AuthService;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LayoutComponent],
      providers: [
        { provide: ProductoService, useClass: MockProductoService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: MessageService, useClass: MockMessageService },
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    authService = TestBed.inject(AuthService);
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all products on ngOnInit', () => {
    spyOn(productoService, 'getProducto').and.callThrough();
    component.ngOnInit();
    expect(productoService.getProducto).toHaveBeenCalled();
    expect(component.producto.length).toBeGreaterThan(0);
  });

  it('should delete a product successfully', () => {
    spyOn(productoService, 'deleteProducto').and.callThrough();
    spyOn(messageService, 'add').and.callThrough();
    
    localStorage.setItem('authToken', 'fakeToken'); // Set a token in localStorage
    
    component.eliminarProducto(1);
    
    expect(productoService.deleteProducto).toHaveBeenCalledWith(1, 'fakeToken');
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Correcto',
      detail: 'Producto eliminado correctamente',
    });
  });

  it('should handle product deletion error when token is not present', () => {
    spyOn(messageService, 'add').and.callThrough();
    
    localStorage.removeItem('authToken'); // Ensure no token is present
    
    component.eliminarProducto(1);
    
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Token de acceso no disponible.',
    });
  });

  it('should handle product deletion error', () => {
    spyOn(productoService, 'deleteProducto').and.returnValue(throwError('Error'));
    spyOn(messageService, 'add').and.callThrough();
    
    localStorage.setItem('authToken', 'fakeToken');
    
    component.eliminarProducto(1);
    
    expect(productoService.deleteProducto).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar el producto',
    });
  });
});
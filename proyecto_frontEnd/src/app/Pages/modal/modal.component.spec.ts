import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoService } from '../../core/services/producto.service';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import ModalComponent from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockProductoService: jasmine.SpyObj<ProductoService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear mocks para los servicios inyectados
    mockProductoService = jasmine.createSpyObj('ProductoService', ['getProductoById', 'createProducto']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [ReactiveFormsModule, FormsModule], // Importar los módulos necesarios
      providers: [
        { provide: ProductoService, useValue: mockProductoService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: Router, useValue: mockRouter },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA], // Para evitar problemas con componentes hijos
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.productoForm).toBeTruthy();
    expect(component.productoForm.get('_NombreProducto')).toBeTruthy();
    expect(component.productoForm.get('_DescripcionProducto')).toBeTruthy();
    expect(component.productoForm.get('_ModeloProducto')).toBeTruthy();
    expect(component.productoForm.get('_MarcaProducto')).toBeTruthy();
    expect(component.productoForm.get('_ColorProducto')).toBeTruthy();
    expect(component.productoForm.get('_TallaProducto')).toBeTruthy();
  });

  it('should get product by ID when editing', () => {
    const mockProducto = { _IdProducto: 1, _NombreProducto: 'Producto 1', _DescripcionProducto: 'Descripción', _ModeloProducto: 'Modelo 1', _MarcaProducto: 'Marca', _ColorProducto: 'Rojo', _TallaProducto: 10 };

    mockProductoService.getProductoById.and.returnValue(of(mockProducto));
    component.ngOnInit(); // Simula la inicialización del componente

    expect(component.productoForm.value).toEqual(mockProducto);
    expect(mockProductoService.getProductoById).toHaveBeenCalled();
  });

  it('should display error if product not found', () => {
    mockProductoService.getProductoById.and.returnValue(throwError('Error'));
    component.ngOnInit();

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'No se encontró el producto',
    });
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should create a product successfully', () => {
    const mockProducto = { _NombreProducto: 'Producto 1', _DescripcionProducto: 'Descripción', _ModeloProducto: 'Modelo 1', _MarcaProducto: 'Marca', _ColorProducto: 'Rojo', _TallaProducto: 10 };
    component.productoForm.setValue(mockProducto);
    
    mockProductoService.createProducto.and.returnValue(of({}));
    component.createProducto();

    expect(mockProductoService.createProducto).toHaveBeenCalledWith(mockProducto, jasmine.any(String));
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Guardado',
      detail: 'Producto guardado correctamente',
    });
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should show error if product creation fails', () => {
    const mockProducto = { _NombreProducto: 'Producto 1', _DescripcionProducto: 'Descripción', _ModeloProducto: 'Modelo 1', _MarcaProducto: 'Marca', _ColorProducto: 'Rojo', _TallaProducto: 10 };
    component.productoForm.setValue(mockProducto);

    mockProductoService.createProducto.and.returnValue(throwError('Error'));
    component.createProducto();

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Revise los campos e intente nuevamente',
    });
  });

  it('should show error if form is invalid during product creation', () => {
    component.productoForm.setValue({
      _NombreProducto: '',
      _DescripcionProducto: '',
      _ModeloProducto: '',
      _MarcaProducto: '',
      _ColorProducto: '',
      _TallaProducto: 0
    });

    component.createProducto();

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Revise los campos e intente nuevamente',
    });
  });
});
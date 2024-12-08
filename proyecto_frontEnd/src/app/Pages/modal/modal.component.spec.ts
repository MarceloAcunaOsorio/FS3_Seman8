import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoService } from '../../core/services/producto.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from "primeng/toast";
import ModalComponent from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let productoService: jasmine.SpyObj<ProductoService>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let router: jasmine.SpyObj<Router>;
  let messageService: jasmine.SpyObj<MessageService>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    // Crear mocks para las dependencias
    const productoServiceSpy = jasmine.createSpyObj('ProductoService', ['createProducto', 'updateProducto', 'getProductoById']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    // Simulamos paramMap con un objeto adecuado
    activatedRouteSpy.snapshot = {
      paramMap: {
        get: (key: string) => key === '_IdProducto' ? '1' : null
      }
    } as any; // Forzar el tipo de `snapshot` a un objeto adecuado

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        CommonModule,
        HeaderComponent,
        FooterComponent,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        ToastModule
      ],
      declarations: [ModalComponent],
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    formBuilder = TestBed.inject(FormBuilder);

    // Configurar el formulario para la prueba
    component.productoForm = formBuilder.group({
      _IdProducto: [null],
      _NombreProducto: ['', [Validators.required]],
      _DescripcionProducto: ['', [Validators.required]],
      _ModeloProducto: ['', [Validators.required]],
      _MarcaProducto: ['', [Validators.required]],
      _ColorProducto: ['', [Validators.required]],
      _TallaProducto: [1, [Validators.required, Validators.min(1)]],
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProductById when editing an existing product', () => {
    // Simulamos que se pasa un Id de producto por la URL
    activatedRoute.snapshot.paramMap.get = jasmine.createSpy().and.returnValue('1');

    const mockProduct = { 
      _IdProducto: 1, 
      _NombreProducto: 'Producto 1', 
      _DescripcionProducto: 'Descripcion', 
      _ModeloProducto: 'Modelo', 
      _MarcaProducto: 'Marca', 
      _ColorProducto: 'Rojo', 
      _TallaProducto: 1 
    };

    productoService.getProductoById.and.returnValue(of(mockProduct));

    component.ngOnInit();

    expect(productoService.getProductoById).toHaveBeenCalledWith(1);
    expect(component.productoForm.value._NombreProducto).toBe('Producto 1');
  });

  it('should show error message when getProductById fails', () => {
    // Simulamos que se pasa un Id de producto por la URL
    activatedRoute.snapshot.paramMap.get = jasmine.createSpy().and.returnValue('1');

    // Simulamos un error al obtener el producto
    productoService.getProductoById.and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(productoService.getProductoById).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'No encontrado'
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should call createProducto and show success message when form is valid', () => {
    const mockFormValue = {
      _IdProducto: 70,
      _NombreProducto: 'Nuevo Producto',
      _DescripcionProducto: 'Descripcion',
      _ModeloProducto: 'Modelo',
      _MarcaProducto: 'Marca',
      _ColorProducto: 'Rojo',
      _TallaProducto: 1
    };

    component.productoForm.setValue(mockFormValue);

    productoService.createProducto.and.returnValue(of(mockFormValue));

    component.createProducto();

    expect(productoService.createProducto).toHaveBeenCalledWith(mockFormValue);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Guardado',
      detail: 'Producto guardado correctamente'
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should show error message when createProducto fails', () => {
    const mockFormValue = {
      _IdProducto: 50,
      _NombreProducto: 'Nuevo Producto',
      _DescripcionProducto: 'Descripcion',
      _ModeloProducto: 'Modelo',
      _MarcaProducto: 'Marca',
      _ColorProducto: 'Rojo',
      _TallaProducto: 1
    };

    component.productoForm.setValue(mockFormValue);

    productoService.createProducto.and.returnValue(throwError('Error'));

    component.createProducto();

    expect(productoService.createProducto).toHaveBeenCalledWith(mockFormValue);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Revise los campos e intente nuevamente'
    });
  });

  it('should call updateProducto and show success message when form is valid', () => {
    const mockFormValue = {
      _IdProducto: 1,
      _NombreProducto: 'Producto Existente',
      _DescripcionProducto: 'Descripcion',
      _ModeloProducto: 'Modelo',
      _MarcaProducto: 'Marca',
      _ColorProducto: 'Rojo',
      _TallaProducto: 1
    };

    component.productoForm.setValue(mockFormValue);

    productoService.updateProducto.and.returnValue(of({}));

    component.updateProducto();

    expect(productoService.updateProducto).toHaveBeenCalledWith(mockFormValue);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Guardado',
      detail: 'Producto actualizado correctamente'
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should show error message when updateProducto fails', () => {
    const mockFormValue = {
      _IdProducto: 1,
      _NombreProducto: 'Producto Existente',
      _DescripcionProducto: 'Descripcion',
      _ModeloProducto: 'Modelo',
      _MarcaProducto: 'Marca',
      _ColorProducto: 'Rojo',
      _TallaProducto: 1
    };

    component.productoForm.setValue(mockFormValue);

    productoService.updateProducto.and.returnValue(throwError('Error'));

    component.updateProducto();

    expect(productoService.updateProducto).toHaveBeenCalledWith(mockFormValue);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Revise los campos e intente nuevamente'
    });
  });
});
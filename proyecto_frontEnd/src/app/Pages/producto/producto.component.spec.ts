import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductoComponent } from './producto.component';
import { ProductoService } from '../../core/services/producto.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { producto } from '../../models/producto';

describe('ProductoComponent', () => {
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;
  let productoService: jasmine.SpyObj<ProductoService>;

  beforeEach(() => {
    // Crear un mock del ProductoService
    const productoServiceSpy = jasmine.createSpyObj('ProductoService', ['getProducto']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule, CommonModule, ProductoComponent], // Incluir el componente standalone
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducto and update producto on ngOnInit', () => {
    // Datos de ejemplo para simular la respuesta
    const mockProductos: producto[] = [
      { _IdProducto: 50, _NombreProducto: 'Producto 1',_DescripcionProducto:'asdasd',_ModeloProducto:'dedede',_MarcaProducto:'dscdsc', _TallaProducto: 100,_ColorProducto:'dcwec' },
      { _IdProducto: 60, _NombreProducto: 'Producto 2',_DescripcionProducto:'wedwe',_ModeloProducto:'ededede',_MarcaProducto:'dwswcsd', _TallaProducto: 200,_ColorProducto:'wdcdw' }
    ];

    // Simulamos la respuesta del servicio getProducto()
    productoService.getProducto.and.returnValue(of(mockProductos));

    // Llamar a ngOnInit, que llama a getAllProductos
    component.ngOnInit();

    // Verificar que se haya llamado a getProducto
    expect(productoService.getProducto).toHaveBeenCalled();

    // Verificar que la propiedad producto se haya actualizado correctamente
    expect(component.producto).toEqual(mockProductos);
  });

  it('should handle empty response from getProducto', () => {
    // Simulamos una respuesta vacía
    productoService.getProducto.and.returnValue(of([]));

    // Llamar a ngOnInit
    component.ngOnInit();

    // Verificar que la propiedad producto sea un array vacío
    expect(component.producto).toEqual([]);
  });

  it('should handle error when getProducto fails', () => {
    // Simulamos que getProducto lanza un error
    productoService.getProducto.and.returnValue(of([])); // Puede usar throwError para simular un error

    // Llamar a ngOnInit
    component.ngOnInit();

    // Verificar que la propiedad producto esté vacía
    expect(component.producto).toEqual([]);
  });
});
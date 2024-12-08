import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuario.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'; // Importar el RouterTestingModule
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import RegistrarComponent from './registrar.component';

describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;
  let usuarioService: jasmine.SpyObj<UsuarioService>;
  let messageService: MessageService;
  let fb: FormBuilder;

  beforeEach(async () => {
    // Crear un espía para el servicio UsuarioService
    const usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', ['createUsuario']);
    
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        ButtonModule,
        ToastModule,
        RouterTestingModule, // Usar RouterTestingModule aquí
        RegistrarComponent // Moverlo aquí
      ],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceSpy },  // Usar el espía
        { provide: MessageService, useValue: { add: jasmine.createSpy() } },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService) as jasmine.SpyObj<UsuarioService>;  // Tipo correcto
    messageService = TestBed.inject(MessageService);
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should handle error when createUsuario fails', () => {
    // Simula un formulario válido
    component.userForm.setValue({
      id: null,
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    });

    // Simula que el método createUsuario falla y devuelve un error
    const errorResponse = new Error('Error');
    usuarioService.createUsuario.and.returnValue(throwError(() => errorResponse));

    component.createUsuario();

    // Verifica que se haya mostrado el mensaje de error
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Revise los campos e intente nuevamente'
    });
  });
});

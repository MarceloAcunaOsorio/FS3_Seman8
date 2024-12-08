import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import LoginComponent from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear mocks para las dependencias
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        HeaderComponent,
        FooterComponent
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Configurar los valores iniciales
    component.email = 'test@example.com';
    component.password = 'password123';
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and navigate to /dashboard on successful login', () => {
    // Simula un comportamiento exitoso de login
    authService.login.and.returnValue(of({}));

    component.login();

    // Verificar que la llamada al login haya ocurrido
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    // Verificar que el enrutador navegue a /dashboard
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should log an error if login fails', () => {
    // Simula un comportamiento de login fallido
    const consoleErrorSpy = spyOn(console, 'error');
    authService.login.and.returnValue(throwError('Login Failed'));

    component.login();

    // Verificar que la llamada al login haya ocurrido
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    // Verificar que se haya mostrado un mensaje de error
    expect(consoleErrorSpy).toHaveBeenCalledWith('Login Failed', 'Login Failed');
  });

});
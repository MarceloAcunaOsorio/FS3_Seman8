import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import RegistrarComponent from './registrar.component';
import { FormGroup } from '@angular/forms';

describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [provideHttpClient(), provideHttpClientTesting(), RegistrarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un formulario de registro valido', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm instanceof FormGroup).toBeTruthy();
    expect(component.userForm.get('email')).toBeDefined();
    expect(component.userForm.get('password')).toBeDefined();
    expect(component.userForm.get('username')).toBeDefined();
  })


  it('debe marcar los campos como invalidos cuando estan vacios', () => {
    const usernameControl = component.userForm.get('username');
    const emailControl = component.userForm.get('email');
    const passwordControl = component.userForm.get('password');

    expect(usernameControl?.invalid).toBeTruthy();
    expect(passwordControl?.invalid).toBeTruthy();
    expect(emailControl?.invalid).toBeTruthy();
  })


  it('debe marcar el campo email como valido con una direccion de correo electronico valido', () => {
    const emailControl = component.userForm.get('email');
    emailControl?.setValue('test@ejemplo.com');
    expect(emailControl?.valid).toBeTruthy();
  })


  it('debe marcar el campo password como valido con una contraseña de al menos 6 caracteres', () => {
    const passwordControl = component.userForm.get('password');
    passwordControl?.setValue('@passwordAA234%');
    expect(passwordControl?.valid).toBeTruthy();
  })

 /* it('debe llamar a la funcion submitForm cuando el formulario se envia con datos validos',()=>
    {
      spyOn(component, 'onSubmit');
      const emailControl = component.userForm.get('email');
      const usuarioControl = component.userForm.get('username');
      const passwordControl = component.userForm.get('password');

      emailControl?.setValue('usuario@gmail.com');
      passwordControl?.setValue('A23wsder@4%');
      usuarioControl?.setValue('jpedro');

      const formsElement: HTMLFormElement =  fixture.nativeElement.querySelector('form')
      formsElement.dispatchEvent(new Event('submit'));
      fixture.detectChanges();
      expect(component.onSubmit).toHaveBeenCalled();
    });
*/
});

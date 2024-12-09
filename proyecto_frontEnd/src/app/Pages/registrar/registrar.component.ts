import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UsuarioService } from '../../core/services/usuario.service';
import {RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule,
            ReactiveFormsModule,
            RouterModule,
            CommonModule,
            HeaderComponent,
            ButtonModule,
            FooterComponent,
            ToastModule,
            InputTextModule,
            HeaderComponent,
            FooterComponent,
            FormsModule
  ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export default class RegistrarComponent {
  
  userForm! : FormGroup;
  isSaveInProgress: boolean = false;
  

  constructor(
    private readonly fb: FormBuilder,
    private readonly usuarioservice: UsuarioService,
    private readonly messageService: MessageService

  ) {
    this.userForm = this.fb.group({
       id: [null],
       email: ['', Validators.required],
       password: ['', Validators.required],
       username: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createUsuario();
  }


  createUsuario() {
    if (this.userForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Revise los campos e intente nuevamente', });
      return;
    }
    this.isSaveInProgress = true;

    this.usuarioservice.createUsuario(this.userForm.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'usuario guardado correctamente' });
        this.isSaveInProgress = false;
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Revise los campos e intente nuevamente' });
      },
    });
  }


}
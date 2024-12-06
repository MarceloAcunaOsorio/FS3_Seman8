import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  email: string='';
  password: string='';

  constructor(private authService: AuthService, private router: Router){

  }

  login(): void{
    this.authService.login(this.email, this.password).subscribe({
      next: ()=> this.router.navigate(['/dashboard']),
      error:(err)=> console.error('Login Failed',err)
    })
  }


}

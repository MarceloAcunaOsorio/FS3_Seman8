import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userLoginOn:boolean=false;
  tokenExists: boolean = false;

  ngOnInit():void
  { 
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('authToken');
      this.tokenExists = !!token;  // true if token exists, false otherwise
    }
  
  }

  constructor(private readonly authService: AuthService){}
 
  logout(): void{
    this.authService.logout();
  }

}

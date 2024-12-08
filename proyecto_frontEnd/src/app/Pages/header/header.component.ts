import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink,HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userLoginOn:boolean=false;
  ngOnInit(): void {}

  constructor(private authService: AuthService){}
  logout(): void{
    this.authService.logout();
  }
}

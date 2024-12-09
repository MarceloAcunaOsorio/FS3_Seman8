import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proyecto_frontEnd';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated()
  }
}

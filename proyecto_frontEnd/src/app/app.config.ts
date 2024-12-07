import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient,provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { UsuarioService } from './core/services/usuario.service';
import { ProductoService } from './core/services/producto.service';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(withFetch()),
  provideAnimationsAsync(),
    MessageService,
  provideAnimationsAsync(),
    HttpClient
  ],
};

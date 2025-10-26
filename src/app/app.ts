import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // 👈 IMPORTANTE
  template: `
    <div class="container">
      <h1>Gestión de Productos e Inventario</h1>
      <router-outlet></router-outlet> <!-- 👈 ahora sí reconocido -->
    </div>
  `,
  styleUrls: ['./app.scss']
})
export class AppComponent {}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div style="padding: 20px;">
      <h2>Panel Admin</h2>
      
      <button style="margin-top: 20px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;" routerLink="/home">
        Volver a Home
      </button>
    </div>
  `
})
export class AdminComponent { }

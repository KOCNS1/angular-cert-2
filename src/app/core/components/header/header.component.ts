import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { APP_ROUTE } from 'src/app/app.route';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  template: `<header class="app-header">
    <h3>Angular Certification lvl2</h3>
  </header>`,
  styles: [
    `
      :host {
        height: 6rem;
      }

      .app-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 2rem;
        box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class HeaderComponent {
  routes = APP_ROUTE;
}

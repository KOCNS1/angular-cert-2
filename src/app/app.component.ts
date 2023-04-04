import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `<main class="app-main">
    <app-header></app-header>
    <section class="app-main__page">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  standalone: true,
  styles: [
    `
      .app-main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;

        &__page {
          height: calc(100% - 6rem - 1rem);
          padding: 2rem;
          overflow-y: auto;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-cert-2';
}

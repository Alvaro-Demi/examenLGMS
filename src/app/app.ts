import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="main-nav">
      <a routerLink="/menu" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <i class="nav-icon">🍽️</i>
        Menú
      </a>
      <a routerLink="/cocteles" routerLinkActive="active">
        <i class="nav-icon">🍸</i>
        Cócteles
      </a>
      <a routerLink="/pedido" routerLinkActive="active">
        <i class="nav-icon">🛒</i>
        Mi Pedido
      </a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
      font-family: 'Poppins', sans-serif;
    }

    .main-nav {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 15px 30px;
      border-radius: 50px;
      display: flex;
      gap: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .main-nav a {
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 25px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      letter-spacing: 0.5px;
      position: relative;
      overflow: hidden;
    }

    .main-nav a::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    .main-nav a:hover::before {
      transform: translateX(0);
    }

    .main-nav a.active {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .main-nav a i {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .main-nav a:hover i {
      transform: translateY(-2px);
    }

    router-outlet {
      display: block;
      padding-bottom: 100px;
    }
  `]
})
export class AppComponent {
  title = 'Restaurante App';
}

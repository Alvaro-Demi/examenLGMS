import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Coctel {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  ingredientes: string[];
  imagen?: string;
  seleccionado: boolean;
}

@Component({
  selector: 'app-cocteles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cocteles-container">
      <div class="cocteles-header">
        <h1>Nuestra Carta de Cócteles</h1>
        <p class="subtitle">Descubre nuestras creaciones únicas y clásicos de la coctelería</p>
      </div>

      <div class="search-section">
        <input 
          type="text" 
          [(ngModel)]="busqueda" 
          (input)="filtrarCocteles()"
          placeholder="Buscar cócteles..."
          class="search-input"
        >
      </div>

      <div class="cocteles-grid">
        <div *ngFor="let coctel of coctelesFiltrados" class="coctel-card">
          <div class="coctel-imagen" [style.background-image]="'url(' + coctel.imagen + ')'">
            <div class="coctel-precio">{{coctel.precio | currency:'EUR'}}</div>
          </div>
          <div class="coctel-contenido">
            <h3>{{coctel.nombre}}</h3>
            <p class="descripcion">{{coctel.descripcion}}</p>
            <div class="ingredientes">
              <h4>Ingredientes:</h4>
              <ul>
                <li *ngFor="let ingrediente of coctel.ingredientes">{{ingrediente}}</li>
              </ul>
            </div>
            <button 
              class="seleccionar-btn"
              [class.seleccionado]="coctel.seleccionado"
              (click)="toggleSeleccion(coctel)">
              {{coctel.seleccionado ? 'Seleccionado' : 'Seleccionar'}}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cocteles-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      color: white;
      font-family: 'Poppins', sans-serif;
    }

    .cocteles-header {
      text-align: center;
      margin-bottom: 40px;
      padding: 40px 0;
      position: relative;
    }

    .cocteles-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: linear-gradient(to right, #48bb78, #38a169);
      border-radius: 2px;
    }

    h1 {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 3px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      background: linear-gradient(to right, #ffffff, #e2e8f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.3rem;
      color: #e2e8f0;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
      font-weight: 300;
    }

    .search-section {
      padding: 20px;
      display: flex;
      justify-content: center;
    }

    .search-input {
      width: 100%;
      max-width: 500px;
      padding: 15px 30px;
      border: none;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1.1rem;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      font-family: 'Poppins', sans-serif;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .search-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .search-input:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .cocteles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      padding: 20px;
    }

    .coctel-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      color: #333;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
    }

    .coctel-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    }

    .coctel-imagen {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .coctel-precio {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(44, 82, 130, 0.9);
      color: white;
      padding: 5px 15px;
      border-radius: 15px;
      font-weight: bold;
    }

    .coctel-contenido {
      padding: 25px;
    }

    .coctel-contenido h3 {
      color: #2c5282;
      margin: 0 0 15px 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .descripcion {
      color: #4a5568;
      margin: 0 0 15px 0;
      font-size: 1rem;
      line-height: 1.6;
      font-weight: 300;
    }

    .ingredientes {
      color: #4a5568;
      margin: 0 0 20px 0;
      font-size: 0.95rem;
      font-style: italic;
      font-weight: 300;
      line-height: 1.5;
    }

    .ingredientes h4 {
      color: #2c5282;
      margin: 0 0 10px 0;
      font-size: 1.1rem;
    }

    .ingredientes ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .ingredientes li {
      color: #4a5568;
      padding: 3px 0;
      font-size: 0.9rem;
    }

    .ingredientes li:before {
      content: "•";
      color: #2c5282;
      font-weight: bold;
      margin-right: 8px;
    }

    .coctel-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }

    .precio {
      color: #2c5282;
      font-weight: 600;
      font-size: 1.3rem;
    }

    .seleccionar-btn {
      background: #2c5282;
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .seleccionar-btn:hover {
      background: #1a365d;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .seleccionar-btn.seleccionado {
      background: #48bb78;
      box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
    }
  `]
})
export class CoctelesComponent {
  busqueda: string = '';
  cocteles: Coctel[] = [
    {
      id: 1,
      nombre: 'Mojito',
      descripcion: 'Refrescante cóctel cubano con ron, menta y lima',
      precio: 8.50,
      ingredientes: ['Ron blanco', 'Menta fresca', 'Lima', 'Azúcar', 'Agua con gas'],
      imagen: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500',
      seleccionado: false
    },
    {
      id: 2,
      nombre: 'Margarita',
      descripcion: 'Clásico cóctel mexicano con tequila y lima',
      precio: 9.50,
      ingredientes: ['Tequila', 'Triple sec', 'Lima', 'Sal'],
      imagen: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500',
      seleccionado: false
    },
    {
      id: 3,
      nombre: 'Old Fashioned',
      descripcion: 'Cóctel clásico americano con bourbon y amargos',
      precio: 10.50,
      ingredientes: ['Bourbon', 'Azúcar', 'Amargos', 'Naranja'],
      imagen: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500',
      seleccionado: false
    },
    {
      id: 4,
      nombre: 'Negroni',
      descripcion: 'Cóctel italiano con ginebra, campari y vermut',
      precio: 11.50,
      ingredientes: ['Ginebra', 'Campari', 'Vermut rojo', 'Naranja'],
      imagen: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500',
      seleccionado: false
    }
  ];

  coctelesFiltrados: Coctel[] = this.cocteles;

  filtrarCocteles(): void {
    if (!this.busqueda) {
      this.coctelesFiltrados = this.cocteles;
    } else {
      const busquedaLower = this.busqueda.toLowerCase();
      this.coctelesFiltrados = this.cocteles.filter(coctel => 
        coctel.nombre.toLowerCase().includes(busquedaLower) ||
        coctel.descripcion.toLowerCase().includes(busquedaLower) ||
        coctel.ingredientes.some(ing => ing.toLowerCase().includes(busquedaLower))
      );
    }
  }

  toggleSeleccion(coctel: Coctel): void {
    coctel.seleccionado = !coctel.seleccionado;
  }
} 
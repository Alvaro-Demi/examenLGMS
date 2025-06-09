import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen?: string;
  seleccionado: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="menu-container">
      <div class="menu-header">
        <h1>Menu</h1>
        <p class="subtitle">Descubre nuestra selección de platos elaborados con los mejores ingredientes</p>
      </div>

      <div class="categorias">
        <button 
          *ngFor="let categoria of categorias" 
          class="categoria-btn"
          [class.active]="categoriaSeleccionada === categoria"
          (click)="filtrarPorCategoria(categoria)">
          {{categoria}}
        </button>
      </div>

      <div class="platos-grid">
        <div *ngFor="let plato of platosFiltrados" class="plato-card">
          <div class="plato-imagen" [style.background-image]="'url(' + plato.imagen + ')'">
            <div class="plato-categoria">{{plato.categoria}}</div>
          </div>
          <div class="plato-contenido">
            <h3>{{plato.nombre}}</h3>
            <p class="descripcion">{{plato.descripcion}}</p>
            <div class="plato-footer">
              <span class="precio">{{plato.precio | currency:'EUR'}}</span>
              <button 
                class="seleccionar-btn"
                [class.seleccionado]="plato.seleccionado"
                (click)="toggleSeleccion(plato)">
                {{plato.seleccionado ? 'Seleccionado' : 'Seleccionar'}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .menu-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      color: white;
      font-family: 'Poppins', sans-serif;
    }

    .menu-header {
      text-align: center;
      margin-bottom: 40px;
      padding: 40px 0;
      position: relative;
    }

    .menu-header::after {
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

    .categorias {
      display: flex;
      gap: 15px;
      margin-bottom: 40px;
      justify-content: center;
      flex-wrap: wrap;
      padding: 0 20px;
    }

    .categoria-btn {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .categoria-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .categoria-btn.active {
      background: white;
      color: #2c5282;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .platos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      padding: 20px;
    }

    .plato-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      color: #333;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
    }

    .plato-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    }

    .plato-imagen {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .plato-categoria {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(44, 82, 130, 0.9);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .plato-contenido {
      padding: 25px;
    }

    .plato-contenido h3 {
      color: #2c5282;
      margin: 0 0 15px 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .descripcion {
      color: #4a5568;
      margin: 0 0 20px 0;
      font-size: 1rem;
      line-height: 1.6;
      font-weight: 300;
    }

    .plato-footer {
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
export class MenuComponent {
  categorias = ['Entrantes', 'Principales', 'Postres', 'Todos'];
  categoriaSeleccionada = 'Todos';

  platos: Plato[] = [
    {
      id: 1,
      nombre: 'Ensalada César',
      descripcion: 'Lechuga romana, pollo a la parrilla, crutones, parmesano y salsa césar',
      precio: 8.50,
      categoria: 'Entrantes',
      imagen: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500',
      seleccionado: false
    },
    {
      id: 2,
      nombre: 'Solomillo de Ternera',
      descripcion: 'Con patatas asadas y verduras de temporada',
      precio: 24.90,
      categoria: 'Principales',
      imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
      seleccionado: false
    },
    {
      id: 3,
      nombre: 'Tiramisú',
      descripcion: 'Postre italiano con café, mascarpone y cacao',
      precio: 6.50,
      categoria: 'Postres',
      imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
      seleccionado: false
    },
    {
      id: 4,
      nombre: 'Carpaccio de Res',
      descripcion: 'Finas láminas de res con rúcula, parmesano y aceite de oliva',
      precio: 12.50,
      categoria: 'Entrantes',
      imagen: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500',
      seleccionado: false
    },
    {
      id: 5,
      nombre: 'Pasta Carbonara',
      descripcion: 'Pasta fresca con huevo, panceta, parmesano y pimienta negra',
      precio: 14.90,
      categoria: 'Principales',
      imagen: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500',
      seleccionado: false
    },
    {
      id: 6,
      nombre: 'Cheesecake',
      descripcion: 'Tarta de queso con frutos rojos y salsa de frambuesa',
      precio: 7.50,
      categoria: 'Postres',
      imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500',
      seleccionado: false
    }
  ];

  get platosFiltrados(): Plato[] {
    if (this.categoriaSeleccionada === 'Todos') {
      return this.platos;
    }
    return this.platos.filter(plato => plato.categoria === this.categoriaSeleccionada);
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }

  toggleSeleccion(plato: Plato): void {
    plato.seleccionado = !plato.seleccionado;
  }
} 
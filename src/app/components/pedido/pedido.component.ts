import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ItemPedido {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tipo: 'plato' | 'coctel';
}

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="pedido-container">
      <div class="pedido-header">
        <h1>Mi Pedido</h1>
        <p class="subtitle">Revisa y personaliza tu pedido antes de finalizarlo</p>
      </div>

      <div class="pedido-section">
        <h2>Platos Seleccionados</h2>
        <div *ngIf="platosSeleccionados.length === 0" class="no-items">
          No hay platos seleccionados
        </div>
        <div *ngFor="let plato of platosSeleccionados" class="pedido-item">
          <div class="item-info">
            <h3>{{plato.nombre}}</h3>
            <p>{{plato.descripcion}}</p>
          </div>
          <div class="item-actions">
            <span class="item-precio">{{plato.precio | currency:'EUR'}}</span>
            <button class="eliminar-btn" (click)="eliminarItem(plato)">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div class="pedido-section">
        <h2>Cócteles Seleccionados</h2>
        <div *ngIf="coctelesSeleccionados.length === 0" class="no-items">
          No hay cócteles seleccionados
        </div>
        <div *ngFor="let coctel of coctelesSeleccionados" class="pedido-item">
          <div class="item-info">
            <h3>{{coctel.nombre}}</h3>
            <p>{{coctel.descripcion}}</p>
          </div>
          <div class="item-actions">
            <span class="item-precio">{{coctel.precio | currency:'EUR'}}</span>
            <button class="eliminar-btn" (click)="eliminarItem(coctel)">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div class="total-section">
        <div class="total-info">
          <div class="total-item">
            <span>Subtotal:</span>
            <span>{{calcularSubtotal() | currency:'EUR'}}</span>
          </div>
          <div class="total-item">
            <span>IVA (21%):</span>
            <span>{{calcularIVA() | currency:'EUR'}}</span>
          </div>
          <div class="total-item total">
            <span>Total:</span>
            <span>{{calcularTotal() | currency:'EUR'}}</span>
          </div>
        </div>
      </div>

      <div class="finalizar-section">
        <button class="finalizar-btn" [disabled]="!hayItems()">
          Finalizar Pedido
        </button>
      </div>
    </div>
  `,
  styles: [`
    .pedido-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      color: white;
      font-family: 'Poppins', sans-serif;
    }

    .pedido-header {
      text-align: center;
      margin-bottom: 40px;
      padding: 40px 0;
      position: relative;
    }

    .pedido-header::after {
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

    .pedido-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      padding: 20px;
    }

    .seccion {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 30px;
      color: #333;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
    }

    .seccion h2 {
      color: #2c5282;
      margin: 0 0 25px 0;
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
      position: relative;
      padding-bottom: 15px;
    }

    .seccion h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, #48bb78, #38a169);
      border-radius: 2px;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid rgba(226, 232, 240, 0.5);
      font-weight: 300;
      transition: all 0.3s ease;
    }

    .item:hover {
      background: rgba(226, 232, 240, 0.1);
      transform: translateX(5px);
    }

    .item:last-child {
      border-bottom: none;
    }

    .item-nombre {
      flex: 1;
      font-weight: 500;
      font-size: 1.1rem;
    }

    .item-precio {
      color: #2c5282;
      font-weight: 600;
      margin: 0 20px;
      font-size: 1.2rem;
    }

    .eliminar-btn {
      background: #e53e3e;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 15px rgba(229, 62, 62, 0.2);
    }

    .eliminar-btn:hover {
      background: #c53030;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(229, 62, 62, 0.3);
    }

    .total {
      text-align: right;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid rgba(226, 232, 240, 0.5);
      font-size: 1.4rem;
      font-weight: 600;
      color: #2c5282;
    }

    .finalizar-section {
      text-align: center;
      margin-top: 50px;
      padding: 20px;
    }

    .finalizar-btn {
      background: #48bb78;
      color: white;
      border: none;
      padding: 18px 45px;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.3rem;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      box-shadow: 0 8px 32px rgba(72, 187, 120, 0.3);
    }

    .finalizar-btn:hover {
      background: #38a169;
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(72, 187, 120, 0.4);
    }
  `]
})
export class PedidoComponent {
  platosSeleccionados: ItemPedido[] = [
    {
      id: 1,
      nombre: 'Ensalada César',
      descripcion: 'Lechuga romana, pollo a la parrilla, crutones, parmesano y salsa césar',
      precio: 8.50,
      tipo: 'plato'
    },
    {
      id: 2,
      nombre: 'Solomillo de Ternera',
      descripcion: 'Con patatas asadas y verduras de temporada',
      precio: 24.90,
      tipo: 'plato'
    }
  ];

  coctelesSeleccionados: ItemPedido[] = [
    {
      id: 1,
      nombre: 'Mojito',
      descripcion: 'Refrescante cóctel cubano con ron, menta y lima',
      precio: 8.50,
      tipo: 'coctel'
    }
  ];

  eliminarItem(item: ItemPedido): void {
    if (item.tipo === 'plato') {
      this.platosSeleccionados = this.platosSeleccionados.filter(p => p.id !== item.id);
    } else {
      this.coctelesSeleccionados = this.coctelesSeleccionados.filter(c => c.id !== item.id);
    }
  }

  calcularSubtotal(): number {
    const totalPlatos = this.platosSeleccionados.reduce((sum, plato) => sum + plato.precio, 0);
    const totalCocteles = this.coctelesSeleccionados.reduce((sum, coctel) => sum + coctel.precio, 0);
    return totalPlatos + totalCocteles;
  }

  calcularIVA(): number {
    return this.calcularSubtotal() * 0.21;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularIVA();
  }

  hayItems(): boolean {
    return this.platosSeleccionados.length > 0 || this.coctelesSeleccionados.length > 0;
  }
} 
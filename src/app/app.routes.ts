import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CoctelesComponent } from './components/cocteles/cocteles.component';
import { PedidoComponent } from './components/pedido/pedido.component';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'cocteles', component: CoctelesComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: '**', redirectTo: 'menu' }
];

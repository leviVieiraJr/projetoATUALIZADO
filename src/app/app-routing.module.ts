import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FinancasComponent } from './components/financas/financas.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AuthGuard } from './auth.guard';  
import { CadastroComponent } from './components/cadastro/cadastro.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent},
  { path: 'login', component: LoginComponent },
  { path: 'financas', component: FinancasComponent, canActivate: [AuthGuard] },
  { path: 'estoque', component: EstoqueComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: '**', redirectTo: '/cadastro' }  // Redireciona para login se a rota estiver vazia
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Componentes
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { FinancasComponent } from './components/financas/financas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

// Serviços
import { AuthService } from './services/auth.service';
import { ProdutoService } from './services/produto.service';
import { FinancasService } from './services/financas.service';
import { ClienteService } from './services/cliente.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Guardas
import { AuthGuard } from './auth.guard';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    CadastroComponent,
    LoginComponent,
    EstoqueComponent,
    FinancasComponent,
    ClientesComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: CadastroComponent }, // Tela inicial definida como cadastro
      { path: 'login', component: LoginComponent },
      { path: 'estoque', component: EstoqueComponent, canActivate: [AuthGuard] },
      { path: 'financas', component: FinancasComponent, canActivate: [AuthGuard] },
      { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    ProdutoService,
    FinancasService,
    ClienteService,
    AuthGuard,
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

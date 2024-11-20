import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { FinancasComponent } from './components/financas/financas.component';
import { ClientesComponent } from './components/clientes/clientes.component';

import { AuthService } from './services/auth.service';
import { ProdutoService } from './services/produto.service';
import { ClienteService } from './services/clientes.service';
import { FinancasService } from './services/financas.service';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    ForgotPasswordComponent,
    EstoqueComponent,
    FinancasComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ProdutoService,
    ClienteService,
    FinancasService
  ],
  bootstrap: [LoginComponent]
})
export class AppModule {}

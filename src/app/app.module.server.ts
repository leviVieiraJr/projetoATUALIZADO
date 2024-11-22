import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule, // Importa o módulo principal da aplicação
    ServerModule // Importa o módulo do servidor para habilitar SSR
  ],
  bootstrap: [AppComponent] // Componente inicial para bootstrap no servidor
})
export class AppServerModule {}

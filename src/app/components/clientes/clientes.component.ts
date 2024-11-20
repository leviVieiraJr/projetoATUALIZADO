import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.model'; // Importa a interface Cliente

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = []; // Define o array de clientes com base na interface Cliente

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes: Cliente[]) => { // Define que 'clientes' é um array de Cliente
        this.clientes = clientes;
      },
      (error: any) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }
}

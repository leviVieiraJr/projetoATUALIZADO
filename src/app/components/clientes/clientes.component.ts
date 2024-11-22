import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientesForm!: FormGroup;
  clienteError: string | null = null;
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.clientesForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required]
    });

    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      (error: any) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.clientesForm.valid) {
      this.clienteService.addCliente(this.clientesForm.value).subscribe(
        (novoCliente: Cliente) => {
          this.clientes.push(novoCliente);
          this.clientesForm.reset();
          this.clienteError = null;
        },
        (error: any) => {
          this.clienteError = 'Erro ao cadastrar cliente.';
          console.error(error);
        }
      );
    }
  }
}

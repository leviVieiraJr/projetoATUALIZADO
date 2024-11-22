import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancasService } from '../../services/financas.service';
import { Venda } from '../../models/venda.model';

@Component({
  selector: 'app-financas',
  templateUrl: './financas.component.html',
  styleUrls: ['./financas.component.css']
})
export class FinancasComponent implements OnInit {
  vendaForm!: FormGroup;
  vendaError: string | null = null;
  historicoVendas: Venda[] = [];

  constructor(
    private fb: FormBuilder,
    private financasService: FinancasService
  ) {}

  ngOnInit(): void {
    this.vendaForm = this.fb.group({
      produto: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(1)]],
      valorUnitario: [0, [Validators.required, Validators.min(0.01)]]
    });

    this.carregarHistoricoVendas();
  }

  carregarHistoricoVendas(): void {
    this.financasService.getVendas().subscribe(
      (vendas: Venda[]) => {
        this.historicoVendas = vendas;
      },
      (error: any) => {
        console.error('Erro ao carregar histórico de vendas:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.vendaForm.valid) {
      this.financasService.addVenda(this.vendaForm.value).subscribe(
        (novaVenda: Venda) => {
          this.historicoVendas.push(novaVenda);
          this.vendaForm.reset();
          this.vendaError = null;
        },
        (error: any) => {
          this.vendaError = 'Erro ao registrar venda.';
          console.error(error);
        }
      );
    }
  }
}

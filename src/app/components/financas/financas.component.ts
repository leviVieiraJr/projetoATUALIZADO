import { Component, OnInit } from '@angular/core';
import { FinancasService } from '../../services/financas.service';
import { Venda } from '../../models/venda.model';

@Component({
  selector: 'app-financas',
  templateUrl: './financas.component.html',
  styleUrls: ['./financas.component.css']
})
export class FinancasComponent implements OnInit {
  vendas: Venda[] = [];

  constructor(private financasService: FinancasService) {}

  ngOnInit(): void {
    this.carregarVendas();
  }

  carregarVendas(): void {
    this.financasService.getVendas().subscribe(
      (vendas: Venda[]) => {
        this.vendas = vendas;
      },
      (error: any) => {
        console.error('Erro ao carregar vendas:', error);
      }
    );
  }

  registrarVenda(venda: Venda): void {
    this.financasService.addVenda(venda).subscribe(
      (novaVenda: Venda) => {
        this.vendas.push(novaVenda);
      },
      (error: any) => {
        console.error('Erro ao registrar venda:', error);
      }
    );
  }
}

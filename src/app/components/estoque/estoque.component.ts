import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos) => {
        this.produtos = produtos;
      },
      (error: any) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }
}

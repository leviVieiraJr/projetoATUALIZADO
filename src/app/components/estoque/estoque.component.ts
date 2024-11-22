import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  estoqueForm!: FormGroup;
  produtos: Produto[] = [];
  estoqueError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.estoqueForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      quantidade: [0, [Validators.required, Validators.min(1)]]
    });

    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos: Produto[]) => {
        this.produtos = produtos;
      },
      (error: any) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.estoqueForm.valid) {
      this.produtoService.addProduto(this.estoqueForm.value).subscribe(
        (novoProduto: Produto) => {
          this.produtos.push(novoProduto);
          this.estoqueForm.reset();
          this.estoqueError = null;
        },
        (error: any) => {
          this.estoqueError = 'Erro ao adicionar produto.';
          console.error(error);
        }
      );
    }
  }

  atualizarQuantidade(produtoId: number, quantidade: number): void {
    this.produtoService.updateQuantidade(produtoId, quantidade).subscribe(
      () => {
        const produto = this.produtos.find((p) => p.id === produtoId);
        if (produto) {
          produto.quantidade = quantidade;
        }
      },
      (error: any) => {
        console.error('Erro ao atualizar quantidade:', error);
      }
    );
  }
}

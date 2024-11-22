import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://seu-endereco-api.com/produtos'; // substitua pelo URL da sua API

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  updateQuantidade(produtoId: number, quantidade: number): Observable<void> {
    const url = `${this.apiUrl}/${produtoId}/quantidade`;
    return this.http.put<void>(url, { quantidade });
  }
}

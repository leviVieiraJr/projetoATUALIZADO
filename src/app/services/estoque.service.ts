import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Produto } from '../models/produto.model';  // O modelo de produto

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private apiUrl = `${environment.apiUrl}/estoque`;  // URL da API para operações de estoque

  constructor(private http: HttpClient) {}

  // Método para obter todos os produtos no estoque
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  // Método para adicionar um novo produto ao estoque
  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  // Método para atualizar a quantidade de um produto no estoque
  atualizarQuantidade(produtoId: number, novaQuantidade: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/quantidade`, { produtoId, novaQuantidade });
  }
}

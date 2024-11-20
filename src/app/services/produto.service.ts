import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/estoque`; // Base URL da API para o módulo de estoque

  constructor(private http: HttpClient) {}

  // Método para obter a lista de produtos
  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produtos`);
  }

  // Método para adicionar um novo produto
  addProduto(produto: { nome: string; descricao: string; quantidade: number; preco: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/produtos`, produto);
  }

  // Método para atualizar um produto
  updateProduto(id: number, produto: { nome: string; descricao: string; quantidade: number; preco: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/produtos/${id}`, produto);
  }

  // Método para excluir um produto
  deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/produtos/${id}`);
  }

  // Método para buscar um produto pelo nome
  getProdutoPorNome(nome: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/produtos?nome=${nome}`);
  }
}

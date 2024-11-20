import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Venda } from '../models/venda.model'; // Certifique-se de ter essa interface

@Injectable({
  providedIn: 'root'
})
export class FinancasService {
  private apiUrl = `${environment.apiUrl}/financas`; // Base URL para o módulo de finanças

  constructor(private http: HttpClient) {}

  // Método para obter a lista de vendas
  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${this.apiUrl}/vendas`);
  }

  // Método para registrar uma nova venda
  addVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(`${this.apiUrl}/vendas`, venda);
  }
}

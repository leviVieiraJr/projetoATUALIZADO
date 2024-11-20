import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // Login
  login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Cadastro
  register(user: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Recuperação de senha
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // Redefinir senha
  resetPassword(token: string, novaSenha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, novaSenha });
  }

  // Gerenciamento do token no localStorage
  salvarToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  obterToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}

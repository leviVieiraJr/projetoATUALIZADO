import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  cadastroError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const user = this.cadastroForm.value;
      this.authService.register(user).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.cadastroError = 'Erro ao cadastrar usuário';
          console.error('Erro ao cadastrar:', error);
        }
      );
    }
  }
}

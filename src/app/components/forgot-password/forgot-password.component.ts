import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup; // Inicialização garantida no construtor
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Inicializa o formulário no construtor
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.authService.forgotPassword(email).subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = null;
        },
        (error: any) => {
          this.errorMessage = error.error?.message || 'Erro ao enviar o e-mail de recuperação';
          this.successMessage = null;
          console.error('Erro ao enviar recuperação de senha:', error);
        }
      );
    }
  }
}

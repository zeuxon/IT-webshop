import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatError, MatHint } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatError, MatHint, MatCard, CommonModule],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  userService = inject(UserService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    address: ['', Validators.required],
  });
  errorMessage: string | null = null;
  successMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();

    this.userService
      .register(rawForm.username, rawForm.email, rawForm.password, rawForm.address)
      .subscribe({
        next: () => {
          this.successMessage = 'Registration successful!';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
  }
}
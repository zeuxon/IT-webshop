import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule, MaterialModule],
})
export class RegisterComponent {
  user: User = { id: 0, name: '', email: '', password: '', address: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private userService: UserService) {}

  register(): void {
    if (!this.user.name.trim()) {
      this.errorMessage = 'Name is required.';
      this.successMessage = '';
      return;
    }

    if (!this.user.email.trim() || !this.validateEmail(this.user.email)) {
      this.errorMessage = 'A valid email is required.';
      this.successMessage = '';
      return;
    }

    if (!this.user.password.trim() || this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      this.successMessage = '';
      return;
    }

    if (!this.user.address.trim()) {
      this.errorMessage = 'Address is required.';
      this.successMessage = '';
      return;
    }

    const success = this.userService.register(this.user);
    if (success) {
      this.successMessage = 'Registration successful!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Email already exists.';
      this.successMessage = '';
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
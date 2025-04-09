import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  user: User = { id: 0, name: '', email: '', password: '', address: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private userService: UserService) {}

  register(): void {
    const success = this.userService.register(this.user);
    if (success) {
      this.successMessage = 'Registration successful!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Email already exists.';
      this.successMessage = '';
    }
  }
}
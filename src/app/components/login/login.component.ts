import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, MaterialModule],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) {}

  login(): void {
    const success = this.userService.login(this.email, this.password);
    if (success) {
      this.snackBar.open('Login successful!', 'Close', { duration: 3000, verticalPosition: 'top'});
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
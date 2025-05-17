import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenu } from '@angular/material/menu';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, MatMenu, MatMenuTrigger],
})
export class NavbarComponent {
  @Input() isAdminUser: boolean = false;
  @Input() loggedInUser: any;
  constructor(private userService: UserService) {}

  logout(): void {
    this.userService.logout();
    alert('You are now logged out.');
  }
}
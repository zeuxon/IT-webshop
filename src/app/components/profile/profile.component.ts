import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, updateEmail, updatePassword } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProfileComponent {
  profileForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });

    this.loadUserData();
  }

  async loadUserData() {
    const user = this.auth.currentUser;
    if (user) {
      this.profileForm.patchValue({
        displayName: user.displayName || '',
        email: user.email || ''
      });
    }
  }

  async onSubmit() {
    const user = this.auth.currentUser;
    if (!user) return;

    const { displayName, email, password } = this.profileForm.value;

    try {
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }
      if (password) {
        await updatePassword(user, password);
      }
      const userDoc = doc(this.firestore, 'users', user.uid);
      await updateDoc(userDoc, { displayName });

      this.message = 'Profile updated successfully!';
    } catch (error: any) {
      this.message = 'Update failed: ' + (error.message || 'Unknown error');
    }
  }
}
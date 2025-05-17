import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  register(name: string, email: string, password: string, address: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async response => {
        await updateProfile(response.user, { displayName: name });
        const userRef = doc(this.firestore, 'users', response.user.uid);
        await setDoc(userRef, {
          name,
          email,
          address,
          isAdmin: false
        });
      })
      .catch(error => {
        console.error('Registration error:', error);
      });

    return from(promise);
  }
  login(email: string, password: string): Observable<void> {

    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {});
    return from(promise);

  }

  getLoggedInUser(): User | null {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      return {
        id: Number(user.uid),
        name: user.displayName || '',
        email: user.email || '',
        password: '',
        address: '',
      };
    }
    return null;
  }

  async isAdmin(): Promise<boolean> {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      const userRef = doc(this.firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        return !!data['isAdmin'];
      }
    }
    return false;
  }

  logout(): void {
    this.firebaseAuth.signOut();
  }

}
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      // Optional: Save name/phone to Firestore later
      alert('Registration successful!');
      this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      const err = error as Error;
      alert('Registration failed: ' + err.message);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

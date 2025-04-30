import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false,
})
export class RegisterPage {
  email = '';
  password = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async register() {
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      const err = error as Error;
      alert('Registration failed: ' + err.message);
    }
  }
}

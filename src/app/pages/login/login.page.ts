import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  rememberMe = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/dashboard']); // or homepage
    } catch (error: unknown) {
      const err = error as Error;
      alert('Login failed: ' + err.message);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

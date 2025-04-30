import { Component } from '@angular/core';
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

  constructor(private router: Router) {}

  login() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const match = storedUsers.find((u: any) => u.email === this.email && u.password === this.password);

    if (match) {
      alert('Login successful!');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Login failed: Incorrect email or password.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

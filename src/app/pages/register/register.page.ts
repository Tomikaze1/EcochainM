import { Component } from '@angular/core';
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

  constructor(private router: Router) {}

  register() {
    if (!this.email || !this.password || !this.confirmPassword || !this.name || !this.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!this.email.includes('@') || !this.email.includes('.')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (this.password.length < 6) {
      alert('Password should be at least 6 characters.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = storedUsers.some((u: any) => u.email === this.email);
    if (userExists) {
      alert('This email is already registered.');
      return;
    }

    storedUsers.push({
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    });

    localStorage.setItem('users', JSON.stringify(storedUsers));
    alert('Registration successful!');
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

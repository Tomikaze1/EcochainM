import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  register() {
    if (!this.name || !this.username || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Please fill in all required fields.', 'danger');
      return;
    }

    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.showToast('Please enter a valid email address.', 'danger');
      return;
    }

    if (this.password.length < 6) {
      this.showToast('Password should be at least 6 characters.', 'danger');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('Passwords do not match!', 'danger');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some((u: any) =>
      u.email === this.email || u.username === this.username
    );

    if (userExists) {
      this.showToast('Email or username already exists.', 'danger');
      return;
    }

    storedUsers.push({
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    });

    localStorage.setItem('users', JSON.stringify(storedUsers));
    this.showToast('Registration successful!', 'success');
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color,
    });
    toast.present();
  }
}

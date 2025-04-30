import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  emailOrUsername = '';
  password = '';
  rememberMe = false;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  login() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const match = storedUsers.find((u: any) =>
      (u.email === this.emailOrUsername || u.username === this.emailOrUsername) &&
      u.password === this.password
    );

    if (match) {
      this.showToast('Login successful!', 'success');
      this.router.navigate(['/dashboard']);
    } else {
      this.showToast('Incorrect email/username or password.', 'danger');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
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

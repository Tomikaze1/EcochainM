import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  styleUrls: ['./fuel.page.scss'],
  standalone:false,
})
export class FuelPage {
  fuelType = '';

  constructor(private router: Router) {}

  saveFuel() {
    if (!this.fuelType) {
      alert('Please select a fuel type.');
      return;
    }
    localStorage.setItem('fuel', this.fuelType);
    this.router.navigate(['/dashboard']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  styleUrls: ['./fuel.page.scss'],
  standalone: false,
})
export class FuelPage {
  selectedFuel: string = '';

  constructor(private router: Router) {}

  selectFuel(fuel: string) {
    this.selectedFuel = fuel;
  }

  confirmFuel() {
    if (!this.selectedFuel) {
      alert('Please select a fuel type.');
      return;
    }

    localStorage.setItem('fuel', this.selectedFuel);
    this.router.navigate(['/dashboard']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
  standalone: false,
})
export class VehiclePage {
  selectedVehicle: string = '';

  constructor(private router: Router) {}

  selectVehicle(vehicle: string) {
    this.selectedVehicle = vehicle;
  }

  confirmVehicle() {
    if (!this.selectedVehicle) {
      alert('Please select a vehicle type.');
      return;
    }

    localStorage.setItem('vehicle', this.selectedVehicle);
    this.router.navigate(['/dashboard']);
  }
}

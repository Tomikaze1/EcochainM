import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage {
  vehicleType = '';

  constructor(private router: Router) {}

  saveVehicle() {
    if (!this.vehicleType) {
      alert('Please select a vehicle type.');
      return;
    }
    localStorage.setItem('vehicle', this.vehicleType);
    this.router.navigate(['/dashboard']);
  }
}

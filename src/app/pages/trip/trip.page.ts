import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
  standalone: false,
})
export class TripPage {
  selectedDestination: string = '';

  constructor(private router: Router) {}

  async confirmTrip() {
    if (!this.selectedDestination) {
      alert('Please select a destination.');
      return;
    }

    const coords = await Geolocation.getCurrentPosition();

    localStorage.setItem('trip', JSON.stringify({
      origin: `Lat: ${coords.coords.latitude}, Lng: ${coords.coords.longitude}`,
      originLat: coords.coords.latitude,
      originLng: coords.coords.longitude,
      destination: this.selectedDestination,
      startedAt: new Date().toISOString()
    }));

    this.router.navigate(['/maps']);
  }

  selectDestination(dest: string) {
    this.selectedDestination = dest;
  }
}

import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  origin: string = '';
  destination: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    const coords = await Geolocation.getCurrentPosition();
    this.origin = `Lat: ${coords.coords.latitude}, Lng: ${coords.coords.longitude}`;
  }

  startTrip() {
    if (!this.destination.trim()) {
      alert('Please enter a destination.');
      return;
    }

    // Save trip info to service/localStorage (can upgrade later to Firebase)
    localStorage.setItem('trip', JSON.stringify({
      origin: this.origin,
      destination: this.destination,
      startedAt: new Date().toISOString()
    }));

    // Navigate to map or summary
    this.router.navigate(['/maps']);
  }
}

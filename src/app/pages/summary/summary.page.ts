import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  trip: any;
  fuel: string = '';
  vehicle: string = '';
  distanceKm: number = 0;
  emissions: number = 0;

  ngOnInit() {
    this.trip = JSON.parse(localStorage.getItem('trip') || '{}');
    this.fuel = localStorage.getItem('fuel') || '';
    this.vehicle = localStorage.getItem('vehicle') || '';
    this.calculateEmissions();
  }

  async calculateEmissions() {
    const emissionFactors: any = {
      Diesel: { Truck: 250, Van: 200 },
      Gasoline: { Truck: 230, Van: 180 },
      Hybrid: { Van: 100 },
      Electric: { Truck: 0, Van: 0 },
    };

    const factor = emissionFactors[this.fuel]?.[this.vehicle] ?? 0;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.trip.destination)}&format=json`);
      const data = await response.json();

      if (data.length > 0 && this.trip.originLat && this.trip.originLng) {
        const destLat = parseFloat(data[0].lat);
        const destLon = parseFloat(data[0].lon);

        this.distanceKm = this.haversine(this.trip.originLat, this.trip.originLng, destLat, destLon);
        this.emissions = Math.round(this.distanceKm * factor);
      } else {
        console.warn('Unable to geocode destination or missing origin coords.');
      }
    } catch (error) {
      console.error('Error calculating emissions:', error);
    }
  }

  haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  finishTrip() {
    alert('Trip completed!');
    localStorage.clear();
    location.href = '/dashboard';
  }
}

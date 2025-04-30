import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: false,
})
export class MapsPage implements OnInit {
  map: any;
  trip: any;

  ngOnInit() {
    this.trip = JSON.parse(localStorage.getItem('trip') || '{}');

    if (this.trip.originLat && this.trip.originLng && this.trip.destination) {
      this.loadMap();
    } else {
      alert('Missing trip data.');
    }
  }

  async loadMap() {
    const destGeo = await this.geocode(this.trip.destination);
    if (!destGeo) return alert('Failed to locate destination.');

    this.map = L.map('map').setView([this.trip.originLat, this.trip.originLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Point A
    const originMarker = L.marker([this.trip.originLat, this.trip.originLng], {
      icon: L.icon({
        iconUrl: 'assets/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    }).addTo(this.map).bindPopup('Point A: Origin');

    // Point B
    const destMarker = L.marker([destGeo.lat, destGeo.lon], {
      icon: L.icon({
        iconUrl: 'assets/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    }).addTo(this.map).bindPopup('Point B: Destination');

    // Line between points
    L.polyline([
      [this.trip.originLat, this.trip.originLng],
      [destGeo.lat, destGeo.lon]
    ], {
      color: 'blue',
      weight: 4
    }).addTo(this.map);
  }

  async geocode(query: string): Promise<any> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    return data.length ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
  }

  arrived() {
    alert('Trip completed!');
    localStorage.clear();
    location.href = '/dashboard';
  }
}

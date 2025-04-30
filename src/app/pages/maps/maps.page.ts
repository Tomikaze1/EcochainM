import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone:false,
})
export class MapsPage implements OnInit, OnDestroy {
  map!: L.Map;
  originMarker!: L.Marker;
  destMarker!: L.Marker;
  trip: any;
  intervalId: any;

  async ngOnInit() {
    // 1. Request geolocation permissions
    await Geolocation.requestPermissions();

    // 2. Get trip from localStorage
    this.trip = JSON.parse(localStorage.getItem('trip') || '{}');

    // 3. Get current GPS location
    const coords = await Geolocation.getCurrentPosition();
    const lat = coords.coords.latitude;
    const lng = coords.coords.longitude;

    // 4. Create Leaflet map
    this.map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // 5. Add current location marker
    this.originMarker = L.marker([lat, lng]).addTo(this.map);
    this.originMarker.bindPopup('You are here').openPopup();

    // 6. Draw destination + route
    if (this.trip.destination) {
      this.drawDestinationAndRoute(lat, lng);
    }

    // 7. Live location updates every 5 seconds
    this.intervalId = setInterval(() => this.updateLocation(), 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async updateLocation() {
    try {
      const coords = await Geolocation.getCurrentPosition();
      const lat = coords.coords.latitude;
      const lng = coords.coords.longitude;

      this.originMarker.setLatLng([lat, lng]);
      this.map.setView([lat, lng]);
    } catch (error) {
      console.error('Failed to get updated location:', error);
    }
  }

  async drawDestinationAndRoute(lat: number, lng: number) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.trip.destination)}&format=json`);
    const data = await response.json();

    if (data.length > 0) {
      const destLat = parseFloat(data[0].lat);
      const destLon = parseFloat(data[0].lon);

      this.destMarker = L.marker([destLat, destLon]).addTo(this.map);
      this.destMarker.bindPopup(`Destination: ${this.trip.destination}`).openPopup();

      const route = L.polyline([[lat, lng], [destLat, destLon]], { color: 'blue' }).addTo(this.map);
      this.map.fitBounds(route.getBounds());
    } else {
      console.warn('Destination geocoding failed.');
    }
  }
}

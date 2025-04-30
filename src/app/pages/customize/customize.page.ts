import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.page.html',
  styleUrls: ['./customize.page.scss'],
  standalone: false,
})
export class CustomizePage implements OnInit {
  trip: any;
  fuel: string = '';
  vehicle: string = '';
  isComplete: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.trip = JSON.parse(localStorage.getItem('trip') || '{}');
    this.fuel = localStorage.getItem('fuel') || '';
    this.vehicle = localStorage.getItem('vehicle') || '';

    this.isComplete = !!(this.trip?.destination && this.fuel && this.vehicle);
  }

  startTrip() {
    if (!this.isComplete) {
      alert('Trip setup is incomplete.');
      return;
    }

    this.router.navigate(['/maps']);
  }
}

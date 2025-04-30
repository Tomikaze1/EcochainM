import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
  standalone: false,
})
export class SummaryPage implements OnInit {
  summary = {
    date: '',
    vehicle: '',
    fuel: 0,
    distance: 0
  };

  ngOnInit() {
    // Example values – update with real values or calculations
    const now = new Date();
    this.summary.date = now.toLocaleString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    });

    this.summary.vehicle = localStorage.getItem('vehicle') || 'N/A';
    this.summary.fuel = 5.5; // 🔧 You can calculate based on trip
    this.summary.distance = 273; // 🔧 You can calculate using coordinates or static
  }

  constructor(private router: Router) {}

  goHome() {
    localStorage.clear(); // Optional
    this.router.navigate(['/dashboard']);
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private firestore: AngularFirestore) {}

  saveTrip(tripData: any) {
    return this.firestore.collection('trips').add(tripData);
  }

  getAllTrips() {
    return this.firestore.collection('trips').valueChanges({ idField: 'id' });
  }
}

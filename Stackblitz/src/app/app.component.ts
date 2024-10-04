import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  totalSeats = 80;
  seats: string[] = Array(this.totalSeats).fill('Available');
  preBookedSeats: number[] = [67, 68, 1, 5, 9, 22];
  bookedSeats: number[] = [];
  requestedSeats: number | null = null;
  errorMessage: string | null = null;

  constructor() {
    this.preBookedSeats.forEach((seat) => {
      this.seats[seat] = 'Booked';
    });
  }

  findSeats(numSeats: number): number[] {
    let booked = [];

    for (let i = 0; i < this.totalSeats; i++) {
      if (this.seats[i] === 'Available') {
        booked.push(i);
        if (booked.length === numSeats) break;
      } else {
        booked = [];
      }
    }

    if (booked.length < numSeats) {
      booked = [];
      for (let i = 0; i < this.totalSeats; i++) {
        if (this.seats[i] === 'Available') {
          booked.push(i);
          if (booked.length === numSeats) break;
        }
      }
    }

    return booked;
  }

  bookSeats() {
    if (this.requestedSeats) {
      const booked = this.findSeats(this.requestedSeats);

      if (booked.length === this.requestedSeats) {
        booked.forEach((seat) => {
          this.seats[seat] = 'Booked';
        });
        this.bookedSeats = booked;
        this.errorMessage = null;
      } else {
        this.errorMessage = 'Not enough seats available.';
        this.bookedSeats = [];
      }
    }
  }
}

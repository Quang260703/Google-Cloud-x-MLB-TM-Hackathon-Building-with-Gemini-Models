import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePickerModule, FormsModule, CommonModule], // Import necessary modules
  templateUrl: './app.component.html', // The template for the component
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  teamNames: { awayTeam: string, homeTeam: string }[] = [];
  selectedDate: Date = new Date(2024, 2, 18);
  private intervalId: any;

  constructor(private appService: AppService) {}

  // Lifecycle hook to start the interval when the component is initialized
  ngOnInit() {
    // this.startApiInterval();
  }

  // Lifecycle hook to clear the interval when the component is destroyed
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // This function will be triggered when a date is selected
  onDateSelect(event: any) {
    const day = this.selectedDate.getDate(); // Day of the month
    const month = this.selectedDate.getMonth(); // Month (0-based)
    const year = this.selectedDate.getFullYear(); // Year
    // Create a new Date object
    var newDate = new Date(year, month, day);
    console.log(newDate);
    this.callApiWithDate(newDate);
  }

  // Call the API with the selected date
  callApiWithDate(date: Date | null) {
    if (date != null) {
      this.appService.getDataByDate(date).subscribe(
        (response) => {
          var games = response.dates[0].games;
          this.teamNames = games.map((play: any) => {
            return {
              awayTeam: play.teams.away.team.name,
              homeTeam: play.teams.home.team.name,
            };
          });
          console.log('API Response:', this.teamNames); // Handle the response
        },
        (error) => {
          console.error('API Error:', error); // Handle error if the request fails
        }
      );
    }
  }

  // Start calling the API every 10 seconds
  startApiInterval() {
    this.intervalId = setInterval(() => {
      this.callApiWithDate(this.selectedDate); // Call the API with the current selected date
    }, 60000); // 10 seconds (10000 milliseconds)
  }
}
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { AppService } from './app.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription, firstValueFrom } from 'rxjs';

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
  interval: Subscription | undefined;
  isBrowser = signal(false);

  constructor(private appService: AppService, @Inject(PLATFORM_ID) platformId: object) {
    this.callApiWithDate(this.selectedDate);
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    if(this.isBrowser()) { // check it where you want to write setTimeout or setInterval
      setInterval(()=> {
        this.callApiWithDate(this.selectedDate)
      }, 10000)
    }
  }

  ngOnDestroy() {
    // Unsubscribe from interval when the component is destroyed to avoid memory leaks
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }

  // This function will be triggered when a date is selected
  onDateSelect(event: any) {
    const day = this.selectedDate.getDate(); // Day of the month
    const month = this.selectedDate.getMonth(); // Month (0-based)
    const year = this.selectedDate.getFullYear(); // Year
    // Create a new Date object
    this.selectedDate = new Date(year, month, day);
    this.callApiWithDate(this.selectedDate);
  }

  // Call the API with the selected date
  async callApiWithDate(date: Date | null) {
    if (date != null) {
      try {
        const response = await firstValueFrom(this.appService.getDataByDate(date));
        const games = response.dates[0].games;
        this.teamNames = games.map((play: any) => {
          return {
            awayTeam: play.teams.away.team.name,
            homeTeam: play.teams.home.team.name,
          };
        });
      } catch (error) {
        this.teamNames = []
      }
    }
  }
}
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { AppService } from './app.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription, firstValueFrom } from 'rxjs';
import { Team } from './interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePickerModule, FormsModule, CommonModule], // Import necessary modules
  templateUrl: './app.component.html', // The template for the component
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  teamNames: { awayTeam: Team, homeTeam: Team, detailedState: string, time: string }[] = [];
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
        const games = response.dates[0]?.games || [];
        if (games.length > 0) {
          this.teamNames = games.map((play: any) => {
            return {
              awayTeam: play.teams.away,
              homeTeam: play.teams.home,
              detailedState: play.status.detailedState,
              time: this.getLocalTime(new Date(play.gameDate))
            };
          });
        }
        else {
          this.teamNames = [];
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  getLocalTime(date: Date) {
    // Format the time in the user's local timezone in 24-hour format (hour and minute only)
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    });
    return formatter.format(date)
  }

  getLogoUrl(teamName: string): string {
    return `assets/Logo/${teamName}.png`; // Adjust path if necessary
  }

  onImageError(event: any): void {
    // Replace the image with the default logo when the image fails to load
    event.target.src = `assets/Logo/mlb.png`;
  }
}
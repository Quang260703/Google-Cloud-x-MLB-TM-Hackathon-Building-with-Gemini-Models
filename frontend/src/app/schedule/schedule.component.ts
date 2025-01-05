import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal } from '@angular/core';
import { AppService } from './schedule.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription, firstValueFrom, interval } from 'rxjs';
import { Team } from '../shared/interface';
import { MLB_TEAMS } from '../shared/constants';
import { Router, RouterOutlet } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, DatePickerModule, FormsModule, RouterOutlet],
  templateUrl: './schedule.component.html', // The template for the component
})
export class ScheduleComponent implements OnInit, OnDestroy {
  teamNames: { awayTeam: Team, homeTeam: Team, detailedState: string, time: string, codedGameState: string }[] = [];
  selectedDate: Date = new Date(2024, 2, 18);
  interval: Subscription | undefined;
  isBrowser = signal(false);

  constructor(private appService: AppService, private router: Router, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    this.callApiWithDate(this.selectedDate);
    
    if(this.isBrowser()) { // check it where you want to write setTimeout or setInterval
      this.interval = interval(10000).subscribe(() => {
        this.callApiWithDate(this.selectedDate);
      });
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
              time: this.getLocalTime(new Date(play.gameDate)),
              codedGameState: play.status.codedGameState
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
    if (MLB_TEAMS.includes(teamName)) {
      return `assets/Logo/${teamName}.png`;
    }
    return `assets/Logo/mlb.png`;
  }

  goToMatch(matchId: string): void {
    this.router.navigate(['/match', matchId]);
  }
}
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../schedule/schedule.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Inning, Play } from '../shared/interface';
import { MLB_TEAMS } from '../shared/constants';

@Component({
  selector: 'app-match',
  imports: [CommonModule],
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit {
  activeTab: number = 1;
  isLoading = signal(true);
  matchData: { description: Play[], finalScore: Inning, scoreByInning: Inning[], home: string, away: string } = {
    description: [],
    finalScore: { home: { runs: "0" }, away: { runs: "0" } }, // Example structure for finalScore (modify as needed)
    scoreByInning: [],
    home: '',
    away: ''
  };

  constructor(private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit() {
    // Retrieve data from route parameters
    const id = this.route.snapshot.paramMap.get('id') || 'No data provided';
    this.callApiWithMatchId(id)
    this.isLoading.set(false)
  }

  async callApiWithMatchId(id: string) {
    try {
      const response = await firstValueFrom(this.appService.getDataByMatchId(id));

      // Extract descriptions
      this.matchData = {
          description: response.liveData?.plays?.allPlays,
          finalScore: response.liveData?.linescore?.teams,
          scoreByInning: response.liveData?.linescore?.innings,
          home: response.gameData?.teams?.home?.name,
          away: response.gameData?.teams?.away?.name
      }

      console.log(this.matchData)
    }
    catch (error) {
      console.log(error);
    }
  }

  getLogoUrl(teamName: string): string {
    if (MLB_TEAMS.includes(teamName)) {
      return `assets/Logo/${teamName}.png`;
    }
    return `assets/Logo/mlb.png`;
  }

  getLocalTime(date: string) {
    var new_date = new Date(date)
    // Format the time in the user's local timezone in 24-hour format (hour and minute only)
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    });
    return formatter.format(new_date)
  }
}
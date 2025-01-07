import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../schedule/schedule.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Inning } from '../shared/interface';
import { MLB_TEAMS } from '../shared/constants';

@Component({
  selector: 'app-match',
  imports: [CommonModule],
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit {
  isLoading = signal(true);
  matchData: { description: string[], finalScore: Inning, scoreByInning: Inning[], home: string, away: string } = {
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

      const allPlays = response.liveData?.plays?.allPlays || [];
      // Extract descriptions
      this.matchData = {
          description: allPlays.map((play: any) => {
            return play.result?.description || 'No description available'; // Fallback to a default value if no description exists
          }),
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
}
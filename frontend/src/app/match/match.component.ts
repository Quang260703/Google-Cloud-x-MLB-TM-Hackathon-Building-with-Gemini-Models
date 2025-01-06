import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../schedule/schedule.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match',
  imports: [CommonModule],
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit {
  matchData!: string[]; // To store data passed to this component

  constructor(private route: ActivatedRoute, private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    // Retrieve data from route parameters
    const id = this.route.snapshot.paramMap.get('id') || 'No data provided';
    const response = await firstValueFrom(this.appService.getDataByMatchId(id));
    const plays = response.liveData?.plays?.allPlays || [];

    // Extract descriptions
    this.matchData = plays.map((play: any) =>
      play.result?.description || 'No description available'
    );
  }
}
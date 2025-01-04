import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
})
export class MatchComponent implements OnInit {
  matchData!: string; // To store data passed to this component

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve data from route parameters
    this.matchData = this.route.snapshot.paramMap.get('id') || 'No data provided';
  }
}
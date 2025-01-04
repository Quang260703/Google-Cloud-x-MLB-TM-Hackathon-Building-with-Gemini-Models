import { Routes } from '@angular/router';
import { MatchComponent } from './match/match.component';

export const routes: Routes = [
    { path: 'match/:id', component: MatchComponent },
];

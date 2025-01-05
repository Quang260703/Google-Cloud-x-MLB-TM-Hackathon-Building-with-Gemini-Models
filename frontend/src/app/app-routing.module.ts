import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ScheduleComponent } from './schedule/schedule.component';
import { MatchComponent } from './match/match.component';

export const routes: Routes = [
    { path: '', redirectTo: '/schedule', pathMatch: 'full' },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'match/:id', component: MatchComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}

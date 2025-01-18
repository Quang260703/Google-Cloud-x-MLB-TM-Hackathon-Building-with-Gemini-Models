import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'MLBScore';
  
  constructor(private router: Router) {}

  goToSchedule() {
    this.router.navigate(['/schedule']);
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CalendarModule } from "primeng/calendar"; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule, FormsModule], // Import necessary modules
  templateUrl: './app.component.html', // The template for the component
})
export class AppComponent {
  title = 'frontend';
  "date": Date;
}

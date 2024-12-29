import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePickerModule, FormsModule], // Import necessary modules
  templateUrl: './app.component.html', // The template for the component
})
export class AppComponent {
  title = 'frontend';
  selectedDate: Date = new Date(Date.now());
  constructor(private appService: AppService) {}
  // This function will be triggered when a date is selected
  onDateSelect(event: any) {
    const day = this.selectedDate.getDate(); // Day of the month
    const month = this.selectedDate.getMonth(); // Month (0-based)
    const year = this.selectedDate.getFullYear(); // Year
  // Create a new Date object
    var newDate = new Date(year, month + 1, day);
    console.log(newDate)
    this.callApiWithDate(newDate);
  }

  // Call the API with the selected date
  callApiWithDate(date: Date | null) {
    console.log(date)
    if (date != null) {
      this.appService.getDataByDate(date).subscribe(
        (response) => {
          console.log('API Response:', response); // Handle the response
        },
        (error) => {
          console.error('API Error:', error); // Handle error if the request fails
        }
      );
    }
  }
}

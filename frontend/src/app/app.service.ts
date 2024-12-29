import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl = 'https://statsapi.mlb.com/api/v1/schedule?sportId=1'; // Base URL

  constructor(private http: HttpClient) {}

  // Example API call to get data based on the date
  getDataByDate(date: Date): Observable<any> {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2-digit format
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit format

    // Construct the URL dynamically with the given date
    const dynamicUrl = `${this.baseUrl}&season=${year}&startDate=${year}-${month}-${day}&endDate=${year}-${month}-${day}`;

    // Make the HTTP GET request
    return this.http.get<any>(dynamicUrl);
}
}
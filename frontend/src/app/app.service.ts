import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'https://jsonplaceholder.typicode.com'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Example API call to get data based on the date
  getDataByDate(date: Date): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts?date=${date}`); // Adjust the endpoint and query param as needed
  }
}
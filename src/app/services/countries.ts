import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Countries {
  private apiUrl = environment.apiUrl;
  private campos = 'name,flags,capital,region,population,cca3';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all?fields=${this.campos}`);
  }

  getByRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/region/${region}?fields=${this.campos}`);
  }
}
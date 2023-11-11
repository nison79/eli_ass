import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing, ListingsResponse } from './shared/listing.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getListings(): Observable<ListingsResponse> {
    return this.http.get<ListingsResponse>(this.dataUrl);
  }
}

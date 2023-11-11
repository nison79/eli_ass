import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Listing, ListingsResponse } from './shared/listing.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public dataUrl = 'assets/data.json';
  private dataSubject = new Subject<Listing[]>();

  constructor(private http: HttpClient) {}

  getListings(): Observable<ListingsResponse> {
    return this.http.get<ListingsResponse>(this.dataUrl);
  }

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  getData(): Observable<Listing[]> {
    return this.dataSubject.asObservable();
  }

  clearData() {
    this.dataSubject.next([]);
  }

}

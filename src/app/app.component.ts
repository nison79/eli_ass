import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Listing, ListingsResponse } from './shared/listing.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'software-directory';

  listings: Listing[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getListings().subscribe({
      next: (data: ListingsResponse) => {
        console.log(data);
        this.listings = data.data;
        console.log(this.listings);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Data fetching completed');
      },
    });
  }
}

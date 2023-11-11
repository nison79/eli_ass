import { Component, Input } from '@angular/core';
import { Listing } from '../shared/listing.interface';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent {
  @Input() listings: Listing[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.listings);
  }
}

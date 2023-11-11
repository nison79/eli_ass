import { Component, OnDestroy, OnInit } from '@angular/core';
import { Listing, ListingsResponse } from '../shared/listing.interface';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  listings: Listing[] = [];
  dataSubscription: Subscription;

  favourites: Listing[] = [];

  constructor(private dataService: DataService) {
    this.subs.push(
      (this.dataSubscription = this.dataService.getData().subscribe((data) => {
        this.listings = data;
        console.log(this.listings);
      }))
    );
  }

  ngOnInit(): void {
    this.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    this.listings = JSON.parse(
      localStorage.getItem('filteredListings') || '[]'
    );
  }

  getStars(rating: number): string {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    return stars;
  }

  onSortingChange(sortOption: any): Listing[] {
    console.log(sortOption);
    if (sortOption.target.value === 'nameAsc') {
      this.listings.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption.target.value === 'nameDesc') {
      this.listings.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption.target.value === 'reviewsAsc') {
      this.listings.sort((a, b) => a.no_of_reviews - b.no_of_reviews);
    } else if (sortOption.target.value === 'reviewsDesc') {
      this.listings.sort((a, b) => b.no_of_reviews - a.no_of_reviews);
    }
    return this.listings;
  }

  toggleFavourite(listing: any): void {
    const index = this.favourites.findIndex((fav) => fav.id === listing.id);
    if (index === -1) {
      this.favourites.push(listing);
    } else {
      this.favourites.splice(index, 1);
    }
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  isFavourite(listing: any): boolean {
    return this.favourites.some((fav) => fav.id === listing.id);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s?.unsubscribe());
  }
}

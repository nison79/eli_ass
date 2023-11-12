import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Listing } from '../shared/listing.interface';

import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  @ViewChild('exampleModal') deleteModal!: ElementRef;
  subs: Subscription[] = [];

  favorites: Listing[] = [];

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favourites') || '[]');
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

  removeAllFavorites(deleteModal: HTMLDivElement): void {
    this.favorites = [];
    localStorage.setItem('favourites', JSON.stringify(this.favorites));

    this.renderer.removeClass(deleteModal, 'show');

    this.router.navigate(['/']);
  }

  removeFavorite(listing: Listing): void {
    const index = this.favorites.findIndex((fav) => fav.id === listing.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    localStorage.setItem('favourites', JSON.stringify(this.favorites));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

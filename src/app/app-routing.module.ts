import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './listings/listings.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  routes: Routes = [
    { path: '', component: ListingsComponent },
    { path: 'favorites', component: FavoritesComponent },
  ];
}

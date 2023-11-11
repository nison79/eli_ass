import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Listing } from './shared/listing.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'software-directory';

  listings: Listing[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {}
}

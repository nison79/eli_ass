import { Component } from '@angular/core';
import { Filter, Listing, ListingsResponse } from '../shared/listing.interface';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-dashboard',
  templateUrl: './filter-dashboard.component.html',
  styleUrls: ['./filter-dashboard.component.scss'],
})
export class FilterDashboardComponent {
  get license(): AbstractControl {
    return this.filterForm?.get('license')!;
  }
  get deployment(): AbstractControl {
    return this.filterForm?.get('deployment')!;
  }
  get industry(): AbstractControl {
    return this.filterForm?.get('industry')!;
  }

  subs: Subscription[] = [];
  listings: Listing[] = [];

  filterForm!: FormGroup;

  distinctIndustryFilters: Filter[] = [];
  distinctLicenseFilters: Filter[] = [];
  distinctDeploymentFilters: Filter[] = [];

  selectedLicense: string | null = '';
  selectedDeployment: string | null = '';
  selectedIndustry: string | null = '';
  selectedFilters: string[] = [];
  allFilters: string[] = ['license', 'deployment', 'industry'];

  filteredListings: Listing[] = [];

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.selectedFilters.forEach((filter) => {
      if (this.allFilters.includes(filter)) {
        this.filterForm.get(filter)?.setValue(true);
      }
    });
    const selectedFiltersFromStorage = localStorage.getItem('selectedFilters');
    this.selectedFilters =
      selectedFiltersFromStorage && selectedFiltersFromStorage !== 'undefined'
        ? JSON.parse(selectedFiltersFromStorage)
        : [];

    const filteredListingsFromLocalStorage =
      localStorage.getItem('filteredListings');
    console.log(filteredListingsFromLocalStorage);
    if (filteredListingsFromLocalStorage) {
      this.filteredListings = filteredListingsFromLocalStorage
        ? JSON.parse(filteredListingsFromLocalStorage)
        : [];
    }

    this.sendData(this.filteredListings);
    this.initForm();

    this.subs.push(
      this.dataService.getListings().subscribe((response: ListingsResponse) => {
        this.listings = response.data;

        // Create an array of distinct industry filters
        this.distinctIndustryFilters = this.listings.reduce(
          (acc: Filter[], listing) => {
            listing.filters.forEach((filter) => {
              if (filter.type === 'industry') {
                const existingFilter = acc.find(
                  (f) => f && f.name === filter.name
                );
                if (!existingFilter) {
                  acc.push(filter);
                }
              }
            });
            return acc;
          },
          []
        );

        // Create an array of distinct license filters
        this.distinctLicenseFilters = this.listings.reduce(
          (acc: Filter[], listing) => {
            listing.filters.forEach((filter) => {
              if (filter.type === 'license') {
                const existingFilter = acc.find(
                  (f) => f && f.name === filter.name
                );
                if (!existingFilter) {
                  acc.push(filter);
                }
              }
            });
            return acc;
          },
          []
        );

        // Create an array of distinct deployment filters
        this.distinctDeploymentFilters = this.listings.reduce(
          (acc: Filter[], listing) => {
            listing.filters.forEach((filter) => {
              if (filter.type === 'deployment') {
                const existingFilter = acc.find(
                  (f) => f && f.name === filter.name
                );
                if (!existingFilter) {
                  acc.push(filter);
                }
              }
            });
            return acc;
          },
          []
        );
      })
    );
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      license: [''],
      deployment: [''],
      industry: [''],
    });
  }

  filterListings() {
    return this.listings.filter((listing) => {
      let matchesLicense =
        !this.license.value ||
        listing.filters.some(
          (filter) =>
            filter.type === 'license' && filter.name === this.license.value
        );
      let matchesDeployment =
        !this.deployment.value ||
        listing.filters.some(
          (filter) =>
            filter.type === 'deployment' &&
            filter.name === this.deployment.value
        );
      let matchesIndustry =
        !this.industry.value ||
        listing.filters.some(
          (filter) =>
            filter.type === 'industry' && filter.name === this.industry.value
        );
      return matchesLicense && matchesDeployment && matchesIndustry;
    });
  }

  onLicenseChange(event: any) {
    this.updateSelectedFilters();
    this.filteredListings = this.filterListings();
    this.updateFilteredListings(this.filteredListings);
    this.sendData(this.filteredListings);
  }

  onDeploymentChange(event: any) {
    this.updateSelectedFilters();
    this.filteredListings = this.filterListings();
    this.updateFilteredListings(this.filteredListings);
    this.sendData(this.filteredListings);
  }

  onIndustryChange(event: any) {
    this.updateSelectedFilters();
    this.filteredListings = this.filterListings();
    this.updateFilteredListings(this.filteredListings);
    this.sendData(this.filteredListings);
  }

  clearFilters(): void {
    this.license.setValue('');
    this.deployment.setValue('');
    this.industry.setValue('');
    this.selectedFilters = [];

    this.filteredListings = this.filterListings();
    console.log(this.filteredListings);
    localStorage.setItem('selectedFilters', JSON.stringify([]));
    localStorage.setItem(
      'filteredListings',
      JSON.stringify(this.filteredListings)
    );

    this.sendData(this.filteredListings);
  }

  updateFilteredListings(listings: any[]): void {
    this.filteredListings = listings;
    localStorage.setItem(
      'filteredListings',
      JSON.stringify(this.filteredListings)
    );
  }

  updateSelectedFilters(): void {
    this.selectedFilters = [
      this.license.value,
      this.deployment.value,
      this.industry.value,
    ].filter(Boolean);

    localStorage.setItem(
      'selectedFilters',
      JSON.stringify(this.selectedFilters)
    );
  }

  removeFilter(filter: string): void {
    console.log(filter);
    if (filter === 'Free' || filter === 'Paid') {
      this.license.setValue('');
      this.updateSelectedFilters();
      this.filteredListings = this.filterListings();
      this.updateFilteredListings(this.filteredListings);
      this.sendData(this.filteredListings);
    }
    if (filter === 'Desktop Application' || filter === 'Mobile Application') {
      this.deployment.setValue('');
      this.updateSelectedFilters();
      this.filteredListings = this.filterListings();
      this.updateFilteredListings(this.filteredListings);
      this.sendData(this.filteredListings);
    }
    if (filter === 'Automotive' || filter === 'Airlines/Aviation') {
      this.industry.setValue('');
      this.updateSelectedFilters();
      this.filteredListings = this.filterListings();
      this.updateFilteredListings(this.filteredListings);
      this.sendData(this.filteredListings);
    }
    this.selectedFilters = this.selectedFilters.filter(
      (item) => item !== filter
    );

    this.sendData(this.filteredListings);
  }

  // this method is used to send the filtered listings to the listings component
  sendData(filteredListings: Listing[]): void {
    this.dataService.sendData(filteredListings);
  }
}

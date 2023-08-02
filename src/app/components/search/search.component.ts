import { Component } from '@angular/core';
import { messages } from 'src/app/helpers/constants';
import { StoreItem } from 'src/app/models/models';
import { CartDataService } from 'src/app/services/cart-data.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-search',
  template: `
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <div class="form-inline my-2 my-lg-0 search-container">
      <div>
        <input
          class="form-control mr-sm-2"
          type="search"
          (input)="search(searchTerm.value)"
          placeholder="Search..."
          #searchTerm
        />
        <span
          [hidden]="!showSearch"
          class="search-icon my-2 my-sm-0 material-icons"
        >
          search</span
        >
      </div>
      <div *ngIf="searchResults.length > 0" class="search-results">
        <ul class="result-item" *ngFor="let result of searchResults">
          <li>{{ result.title }}</li>
          <img
            class="shop-item-image"
            alt="{{ result.title }}"
            src="{{ result.image }}"
          />
          <li>$ {{ result.price }}</li>
          <div class="btns-search-container">
            <app-add-item
              [storeItem]="result"
              [(selectedSize)]="userSize"
            ></app-add-item>
            <app-select-size
              [storeItem]="result"
              (selectedSize)="updateSize($event)"
            ></app-select-size>
          </div>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['../header/header.component.css'],
})
export class SearchComponent {
  itemsInfo: Array<StoreItem> = [];
  list: Array<StoreItem> = [];
  showSearch: boolean = true;
  searchResults: StoreItem[] = [];
  userSize: string = 'Size';

  constructor(
    public cartService: CartDataService,
    public storeService: StoreDataService,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.storeService.getStoreItems().subscribe((resultFromDB: StoreItem[]) => {
      this.itemsInfo = resultFromDB.map((item: StoreItem) => item);
      this.itemsInfo.forEach((item) =>
        item.category == 1
          ? (item.sizes = this.storeService.getBabiesSizes())
          : (item.sizes = this.storeService.getGirlsSizes())
      );
      this.list = this.itemsInfo.reverse();
    });
  }
  search(searchTerm: any): void {
    this.showSearch = false;
    if (searchTerm.length == 0) this.showSearch = true;
    if (searchTerm) {
      this.searchResults = this.list.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.image.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.price.toString().includes(searchTerm.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }
  updateSize(itemSize: string) {
    this.userSize = itemSize;
  }
  showSuccess() {
    this.toastService.show(messages.itemAddedToCart, {
      classname: 'bg-info text-light',
      delay: 2000,
    });
  }
}

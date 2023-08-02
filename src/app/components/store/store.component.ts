import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../../services/store-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { SectionInfo, StoreItem } from 'src/app/models/models';

@Component({
  selector: 'app-store',
  template: `
    <section
      *ngFor="let section of sectionsDetails"
      class="container content-section"
    >
      <h2 class="section-header">
        {{ section.title }}
      </h2>
      <div class="shop-items">
        <div *ngFor="let item of section.data" class="shop-item">
          <img
            class="shop-item-image"
            alt="{{ item.title }}"
            src="{{ item.image }}"
          />
          <span class="shop-item-title">{{ item.title }}</span>
          <div class="shop-item-details">
            <span class="shop-item-price"
              ><span class="shop-item-price">$</span>{{ item.price }}</span
            >
            <div class="btns-shop-container">
              <app-add-item
                [storeItem]="item"
                [(selectedSize)]="userSize"
              ></app-add-item>
              <app-select-size
                [storeItem]="item"
                (selectedSize)="updateSize($event)"
              ></app-select-size>
            </div>
          </div>
        </div>
      </div>

      <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
    </section>
  `,
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  itemsInfo: Array<StoreItem> = [];
  sectionsDetails: Array<SectionInfo> | undefined;
  userSize: string = 'Size';

  constructor(
    public dataFromService: StoreDataService,
    public toastService: ToastService
  ) {
    console.log('constructor store');
  }
  ngOnInit() {
    this.dataFromService
      .getStoreItems()
      .subscribe((resultFromDB: StoreItem[]) => {
        this.itemsInfo = resultFromDB.map((item: StoreItem) => item);
        this.itemsInfo.forEach((item) =>
          item.category == 1
            ? (item.sizes = this.dataFromService.getBabiesSizes())
            : (item.sizes = this.dataFromService.getGirlsSizes())
        );
        this.sectionsDetails = [
          {
            title: 'BABIES',
            data: this.itemsInfo.filter((item) => item.category == 1),
          },
          {
            title: 'GIRLS',
            data: this.itemsInfo.filter((item) => item.category == 2),
          },
        ];
      });
  }

  updateSize(itemSize: string) {
    this.userSize = itemSize;
  }
}

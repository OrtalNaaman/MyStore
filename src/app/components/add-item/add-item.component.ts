import { Component, EventEmitter, Input, Output } from '@angular/core';
import { messages } from 'src/app/helpers/constants';
import { CartItem, StoreItem } from 'src/app/models/models';
import { CartDataService } from 'src/app/services/cart-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-item',
  template: ` <button
    class="btn btn-primary shop-item-button"
    type="button"
    (click)="onClickAddToCart()"
  >
    ADD TO CART
  </button>`,
  styleUrls: ['../store/store.component.css'],
})
export class AddItemComponent {
  @Input() storeItem: StoreItem = new StoreItem();
  @Input() selectedSize: string = 'Size';
  @Output() selectedSizeChange: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(
    private dataFromCartService: CartDataService,
    public toastService: ToastService
  ) {}

  onClickAddToCart() {
    let addedItem = new CartItem();
    addedItem.item = this.storeItem;
    addedItem.size = this.selectedSize;
    if (this.selectedSize == 'Size') this.showWarning(messages.chooseSize);
    else {
      this.dataFromCartService.addOneItemToCart(addedItem);
      this.showSuccess();
      this.selectedSizeChange.emit('Size');
    }
  }
  showSuccess() {
    this.toastService.show(messages.itemAddedToCart, {
      classname: 'bg-info text-light',
      delay: 2000,
    });
  }
  showWarning(message: string) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 2500,
    });
  }
}

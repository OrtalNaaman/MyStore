import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreItem } from 'src/app/models/models';

@Component({
  selector: 'app-select-size',
  template: ` <select
    class="item-sizes"
    #itemSize
    (change)="updateSize(itemSize.value)"
  >
    <option>Size</option>
    <option *ngFor="let size of storeItem.sizes">
      {{ size }}
    </option>
  </select>`,
  styleUrls: ['../store/store.component.css'],
})
export class SelectSizeComponent {
  @Input() storeItem: StoreItem = new StoreItem();
  @Output() selectedSize: EventEmitter<string> = new EventEmitter<string>();

  updateSize(itemSize: string) {
    this.selectedSize.emit(itemSize);
  }
}

import { Component, Input } from '@angular/core';
import { Iuser, Order, StoreItem } from 'src/app/models/models';
import { OrdersService } from 'src/app/services/orders.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { messages } from 'src/app/helpers/constants';
import { OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order',
  template: ` <div class="orders-container">
    <div class="cart-row">
      <span class="order-item cart-header order-column">ITEM</span>
      <span class="order-price cart-header order-column">PRICE</span>
      <span class="order-quantity cart-header order-column">QUANTITY</span>
      <span class="order-date cart-header order-column">ORDER-DATE</span>
      <span
        *ngIf="authService.loginUser?.authLevel == 2"
        class="update-del cart-header order-column"
        >UPDATE-DELIVERY</span
      >
      <span class="del-date cart-header order-column">DELIVERY-DATE</span>
    </div>

    <div class="order-items">
      <div *ngFor="let order of ordersForUser" class="cart-row">
        <div class="order-item order-column">
          <img
            class="cart-item-image"
            src="{{ getItemById(order.storeItemId).image }}"
          />
          <span class="cart-item-title order-item-title"
            >{{ getItemById(order.storeItemId).title }} ({{ order.size }})</span
          >
        </div>
        <div class="order-price order-column">
          $ {{ getItemById(order.storeItemId).price }}
        </div>

        <span class="order-quantity order-column">
          {{ order.quantity }}
        </span>

        <span class="order-date order-column">
          {{ order.orderDate | date : 'dd/MM/yyyy' }}</span
        >
        <span
          *ngIf="authService.loginUser?.authLevel == 2"
          class="update-del order-column"
        >
          <button
            (click)="onClickSentBtn(order)"
            class="btn-order-update"
            type="button"
            title="Item has been sent"
            *ngIf="!order.sent"
          >
            V
          </button>
          <span *ngIf="order.sent">Order has been sent</span>
        </span>
        <span *ngIf="order.sent" class="del-date order-column">
          {{ order.deliveryDate | date : 'dd/MM/yyyy' }}</span
        >
        <span *ngIf="!order.sent" class="del-date order-column">
          Order need to be handle</span
        >
      </div>
    </div>
    <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
  </div>`,
  styleUrls: ['../store/store.component.css'],
})
export class OrderComponent implements OnDestroy {
  @Input() user!: Iuser;
  ordersData: Order[] = [];
  storeItemsInfo: Array<StoreItem> = [];
  datesForUser: Date[] = [];
  ordersForUser: Order[] = [];

  constructor(
    public ordersService: OrdersService,
    public storeService: StoreDataService,
    private userService: UserService,
    public authService: AuthService,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe((resultFromDB: Order[]) => {
      this.ordersData = resultFromDB.map((item: Order) => item);
      this.userService.userOrders = this.getOrdersForUser(this.user?.id);

      this.userService.userOrders.forEach((order) => {
        if (!this.userService.ordersDates.includes(order.orderDate)) {
          this.userService.ordersDates.push(order.orderDate);
        }
      });
      this.datesForUser = this.userService.ordersDates;
      this.ordersForUser = this.userService.userOrders;
    });
    this.storeService.getStoreItems().subscribe((resultFromDB: StoreItem[]) => {
      this.storeItemsInfo = resultFromDB.map((item: StoreItem) => item);
    });
  }

  onClickSentBtn(orderToUpdate: Order) {
    orderToUpdate.sent = true;
    orderToUpdate.deliveryDate = new Date();
    this.ordersService
      .updateOrder(orderToUpdate.id, orderToUpdate)
      .subscribe((res) => {});
    this.showSuccess();
  }
  showSuccess() {
    this.toastService.show(messages.updateOrderSuccess, {
      classname: 'bg-info text-light',
      delay: 2000,
    });
  }
  getOrdersForUser(userId: string) {
    let allUserOrders = this.ordersData.filter(
      (order) => order.userId == userId
    );

    return allUserOrders;
  }
  getItemById(id: number): StoreItem {
    return this.storeItemsInfo.find((item) => item.id == id)!;
  }
  ngOnDestroy(): void {
    this.toastService.clear();
  }
}

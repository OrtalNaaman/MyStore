import { Component } from '@angular/core';
import { CartDataService } from 'src/app/services/cart-data.service';
import { ToastService } from '../../services/toast.service';
import { messages } from 'src/app/helpers/constants';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CartItem, Order } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: `
    <section class="container content-section">
      <h2 class="section-header">CART</h2>
      <div class="cart-row">
        <span class="cart-item cart-header cart-column">ITEM</span>
        <span class="cart-price cart-header cart-column">PRICE</span>
        <span class="cart-quantity cart-header cart-column">QUANTITY</span>
      </div>
      <div class="cart-items">
        <div *ngFor="let cartItem of cartService.items" class="cart-row">
          <div class="cart-item cart-column">
            <img class="cart-item-image" src="{{ cartItem.item.image }}" />
            <span class="cart-item-title"
              >{{ cartItem.item.title }} ({{ cartItem.size }})</span
            >
          </div>
          <span class="cart-price cart-column"
            >$ {{ cartItem.item.price }}</span
          >
          <div class="cart-quantity cart-column">
            <input
              (change)="onQuantityChanged($event, cartItem)"
              (keydown)="returnFalse()"
              class="cart-quantity-input"
              type="number"
              min="1"
              value="{{ cartItem.quantity }}"
            />
            <button
              (click)="onClickRemoveBtn(cartItem)"
              class="btn btn-remove"
              type="button"
              title="Remove item"
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div class="cart-total">
        <strong class="cart-total-title">Total</strong>
        <span class="cart-total-price"
          ><span class="cart-total-price">$</span>{{ cartService.total }}</span
        >
      </div>
      <button
        class="btn btn-primary btn-purchase"
        type="submit"
        (click)="orderConfirmation()"
      >
        PURCHASE
      </button>
      <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
    </section>
  `,
  styleUrls: ['../store/store.component.css'],
})
export class CartComponent implements OnDestroy {
  constructor(
    public cartService: CartDataService,
    public authService: AuthService,
    public ordersService: OrdersService,
    public toastService: ToastService,
    public router: Router,
    public userService: UserService
  ) {}

  onQuantityChanged(event: any, item: CartItem) {
    this.cartService.updateCart(item, Number(event.target.value));
  }
  returnFalse() {
    return false;
  }
  onClickRemoveBtn(cartItem: CartItem) {
    this.cartService.removeItemsFromCart(cartItem);
    this.showWarning(messages.itemRemovedFromCart);
    if (this.cartService.quantity == 0)
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
  }
  orderConfirmation() {
    if (this.authService.isLogin) {
      let userName = this.authService.loginUser?.userName;
      let email = this.authService.loginUser?.email;
      this.showSuccess(userName + messages.confirmOrder + email);

      let userOrder = this.generateOrderArray(this.cartService.itemsInCart);

      userOrder.forEach((o: Order) => {
        this.ordersService.createOrder(o).subscribe((res) => {});
      });

      this.cartService.items.forEach((item) =>
        this.cartService.removeItemsFromCart(item)
      );
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 4500);
    } else this.showWarning(messages.needToSignIn);
  }

  generateOrderArray(items: CartItem[]) {
    let newOrderArray: Order[] = [];
    items.forEach((ci: CartItem) => {
      let newOrder: Order = {
        id: 0,
        userId: this.authService.loginUser?.id!,
        storeItemId: ci.item.id,
        size: ci.size,
        quantity: ci.quantity,
        orderDate: new Date(),
        sent: false,
        deliveryDate: new Date(),
      };
      console.log(newOrder);
      newOrderArray.push(newOrder);
    });
    return newOrderArray;
  }

  showSuccess(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 4500,
    });
  }
  showWarning(message: string) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 2500,
    });
  }
  ngOnDestroy(): void {
    this.toastService.clear();
  }
}

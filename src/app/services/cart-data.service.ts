import { Injectable } from '@angular/core';
import { CartItem } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  public itemsInCart: CartItem[] = [];
  private totalPayment: number = 0;
  private totalQuantity: number = 0;

  constructor() {
    this.itemsInCart = this.items;
    this.calculateTotalPayment();
    this.totalQuantity = this.quantity;
  }

  public get items(): CartItem[] {
    try {
      const jsonStr = localStorage.getItem('user-cart') || '';
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  }
  public get total(): number {
    return this.totalPayment;
  }
  public get quantity(): number {
    this.totalQuantity = 0;
    this.itemsInCart.forEach((item) => {
      this.totalQuantity += item.quantity;
    });
    return this.totalQuantity;
  }

  updateCart(item: CartItem, quantity: number) {
    let itemIndex = this.findItemIndexInCart(item);
    let lastItemId = this.itemsInCart[this.itemsInCart.length - 1].id;
    if (itemIndex < 0) {
      item.id = ++lastItemId;
      this.itemsInCart.push(item);
    } else this.itemsInCart[itemIndex].quantity = quantity;
    this.calculateTotalPayment();
    this.saveInLocalStorage();
  }
  addOneItemToCart(item: CartItem) {
    let itemIndex = this.findItemIndexInCart(item);
    let lastItemId = 0;
    try {
      lastItemId = this.itemsInCart[this.itemsInCart.length - 1].id;
    } catch {
      lastItemId = 0;
    }

    if (itemIndex < 0) {
      item.id = ++lastItemId;
      item.quantity++;
      this.itemsInCart.push(item);
    } else if (this.itemsInCart[itemIndex].size == item.size) {
      this.itemsInCart[itemIndex].quantity++;
    } else {
      item.id = this.itemsInCart.length;
      item.quantity++;
      this.itemsInCart.push(item);
    }
    this.saveInLocalStorage();
    this.calculateTotalPayment();
  }
  removeItemsFromCart(item: CartItem) {
    let itemIndex = this.itemsInCart.map((i) => i.id).indexOf(item.id);
    this.itemsInCart.splice(itemIndex, 1);
    this.saveInLocalStorage();
    this.calculateTotalPayment();
  }
  findItemIndexInCart(cartItem: CartItem): number {
    let itemIndex = -1;
    for (let index = 0; index < this.itemsInCart.length; index++) {
      if (
        cartItem.item.title === this.itemsInCart[index].item.title &&
        cartItem.size === this.itemsInCart[index].size
      ) {
        return index;
      }
    }
    return itemIndex;
  }

  calculateTotalPayment() {
    let sum = 0;
    this.itemsInCart.forEach(
      (item) => (sum += item.item.price * item.quantity)
    );
    this.totalPayment = Number(sum.toFixed(2));
  }
  saveInLocalStorage() {
    localStorage.setItem('user-cart', JSON.stringify(this.itemsInCart));
  }
  DeleteFromLocalStorage() {
    localStorage.clear();
  }
}

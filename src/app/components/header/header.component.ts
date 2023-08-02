import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartDataService } from 'src/app/services/cart-data.service';

@Component({
  selector: 'app-header',
  template: `
    <nav
      class="navbar navbar-expand-lg bg-light"
      [ngClass]="{ sticky: isSticky }"
    >
      <div class="container-fluid">
        <a class="navbar-brand">
          <img class="favicon" src="../assets/Images/favicon.png" />UCG
        </a>
        <app-menu-button
          (showMenuEvent)="showMenuHandler($event)"
        ></app-menu-button>
        <div
          [ngClass]="{
            'collapse navbar-collapse': true,
            show: showMenu
          }"
          id="navbarNavAltMarkup"
        >
          <div class="navbar-nav">
            <div class="navbar-nav">
              <a
                *ngFor="let page of pages"
                routerLink="{{ page.route }}"
                class="nav-link nav-item"
                routerLinkActive="active"
                >{{ page.title }}</a
              >
            </div>
            <a
              [ngClass]="{
                'nav-link nav-item navbar-nav': true,
                disabled: cartService.quantity == 0
              }"
              routerLinkActive="active"
            >
              <span id="cart-icon" class="material-icons" routerLink="cart"
                >shopping_cart</span
              >
              <span
                class="position-absolute  translate-middle badge rounded-pill bg-info"
                *ngIf="cartService.quantity > 0"
                >{{ cartService.quantity }}</span
              >
            </a>
          </div>
          <div class="navbar-nav">
            <a
              *ngIf="authService.loginUser?.authLevel == 2"
              routerLink="manage-orders"
              class="nav-link nav-item"
              routerLinkActive="active"
              >Manage Orders</a
            >
          </div>

          <div class="navbar-nav">
            <app-search></app-search>
            <app-sign-out-btn></app-sign-out-btn>
          </div>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.css'],
})
export class MyHeaderComponent {
  isSticky: boolean = false;
  showMenu: boolean = false;
  pages: any[] = [
    { route: 'about', title: 'About' },
    { route: 'home', title: 'Home' },
    { route: 'sign-in', title: 'Sign-in/Sign-up' },
  ];

  constructor(
    public cartService: CartDataService,
    public authService: AuthService
  ) {}

  showMenuHandler(showMenu: boolean) {
    this.showMenu = showMenu;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= 170;
  }
}

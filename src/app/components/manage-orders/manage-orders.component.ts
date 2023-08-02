import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-orders',
  template: `
    <section class="container content-section">
      <h2 class="section-header">USERS ORDERS</h2>
      <div *ngFor="let user of ordersService.users">
        <h1 class="section-header cart-row">{{ user.userName }}</h1>
        <hr />
        <app-order [user]="user"></app-order>
      </div>
    </section>
  `,
  styleUrls: ['../store/store.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  ordersData: Order[] = [];

  constructor(
    public ordersService: OrdersService,
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe((resultFromDB: Order[]) => {
      this.ordersData = resultFromDB.map((item: Order) => item);
      let ids = resultFromDB.map((order: Order) => order.userId);
      ids.forEach((id) => {
        if (!this.ordersService.usersIdsForOrders.includes(id)) {
          this.ordersService.usersIdsForOrders.push(id);
        }
      });
      this.ordersService.usersIdsForOrders.forEach((id) =>
        this.authService.getUserById(id).subscribe((user) => {
          this.ordersService.users.push(user);
        })
      );
    });
  }

  getOrdersForUser(userId: string) {
    let allUserOrders = this.ordersData.filter(
      (order) => order.userId == userId
    );

    return allUserOrders;
  }
}

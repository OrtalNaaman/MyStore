import { Component } from '@angular/core';
import { Order } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  template: `
    <section class="container content-section">
      <h2 class="section-header">
        {{ authService.loginUser!.userName }} Orders
      </h2>

      <app-order [user]="authService.loginUser!"></app-order>
    </section>
  `,
  styleUrls: ['../store/store.component.css'],
})
export class UserOrdersComponent {
  ordersData: Order[] = [];

  constructor(
    public ordersService: OrdersService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe((resultFromDB: Order[]) => {
      this.ordersData = resultFromDB.map((item: Order) => item);
    });
  }

  getOrdersForUser(userId: string) {
    let allUserOrders = this.ordersData.filter(
      (order) => order.userId == userId
    );

    return allUserOrders;
  }
}

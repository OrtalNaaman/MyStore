import { Injectable } from '@angular/core';
import { Iuser, Order } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  usersIdsForOrders: string[] = [];
  users: Iuser[] = [];

  constructor(private service: HttpClient) {}

  createOrder(newOrder: Order) {
    return this.service.post<Order>(
      'https://localhost:7207/api/Orders',
      newOrder
    );
  }

  getAllOrders() {
    return this.service.get<Order[]>('https://localhost:7207/api/Orders');
  }

  getOrder(id: number) {
    return this.service.get<Order>(`https://localhost:7207/api/Orders/${id}`);
  }

  updateOrder(id: number, order: any) {
    return this.service.put<Order>(
      `https://localhost:7207/api/Orders/${id}`,
      order
    );
  }
}

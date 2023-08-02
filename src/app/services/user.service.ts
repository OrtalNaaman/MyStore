import { Injectable } from '@angular/core';
import { messages } from '../helpers/constants';
import { Order, UserRegisterDTO } from '../models/models';
import { AuthService } from './auth.service';
import { LocalStorageHandler } from '../helpers/localStorageHandler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  registeredUsers: Array<any> = [];
  ordersDates: Date[] = [];
  userOrders: Order[] = [];

  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.isLogin = false;
    this.authService.loginUserChanged.next(null);
    LocalStorageHandler.DeleteAllFromLocalStorage();
  }

  addUser(name: string, email: string, password: string) {
    let userToAdd: UserRegisterDTO = {
      userName: name,
      email: email,
      password: password,
    };
    try {
      this.authService.register(userToAdd);
    } catch {
      throw messages.allreadyRegistered;
    }
  }
}

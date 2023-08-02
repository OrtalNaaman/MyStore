import { Injectable } from '@angular/core';
import { Iuser, LoginUserDTO, UserRegisterDTO } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToShow: Iuser | undefined;
  loginUserChanged = new Subject();
  loginUser: Iuser | undefined;
  isLogin: boolean = false;

  constructor(private service: HttpClient) {}

  register(userRegisterDTO: UserRegisterDTO) {
    return this.service.post<Iuser>(
      'https://localhost:7207/api/Auth/register',
      userRegisterDTO
    );
  }

  login(loginUserDTO: LoginUserDTO) {
    return this.service.post<Iuser>(
      'https://localhost:7207/api/Auth/login',
      loginUserDTO
    );
  }

  getUserById(id: string) {
    return this.service.get<Iuser>(
      `https://localhost:7207/api/Auth/getUser/${id}`
    );
  }

  getUsers() {
    return this.service.get<Iuser[]>(
      `https://localhost:7207/api/Auth/getUsers`
    );
  }

  refreshToken() {
    return this.service.post<Iuser>(
      'https://localhost:7207/api/Auth/refreshtoken',
      {
        id: localStorage.getItem('Id'),
        token: localStorage.getItem('Token'),
        refreshToken: localStorage.getItem('RefreshToken'),
      }
    );
  }
}

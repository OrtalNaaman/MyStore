import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-out-btn',
  template: ` <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
    />
    <button
      class="btn btn-primary sign-out-btn"
      title="Sign-out"
      *ngIf="authService.isLogin"
      (click)="userService.signOut()"
    >
      <span class="material-symbols-outlined"> power_settings_new </span>
    </button>`,
  styleUrls: ['../header/header.component.css'],
})
export class SignOutBtnComponent {
  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}
}

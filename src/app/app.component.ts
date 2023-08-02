import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LocalStorageHandler } from './helpers/localStorageHandler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MyStore';

  constructor(private authService: AuthService) {
    if (localStorage.getItem('Token')) {
      this.authService.refreshToken().subscribe((user) => {
        localStorage.setItem('Id', user.id);
        localStorage.setItem('Token', user.token);
        localStorage.setItem('RefreshToken', user.refreshToken);
        this.authService
          .getUserById(LocalStorageHandler.getLoginUserId())
          .subscribe((user) => {
            this.authService.isLogin = true;
            this.authService.loginUser = user;
            this.authService.loginUserChanged.next(user);
          });
      });
    }
  }
}

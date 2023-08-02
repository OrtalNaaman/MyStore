import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { messages } from '../../helpers/constants';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Iuser, LoginUserDTO } from 'src/app/models/models';
import { LocalStorageHandler } from 'src/app/helpers/localStorageHandler';

@Component({
  selector: 'sign-in',
  template: `
    <div class="auth-form-container">
      <h2 id="set-title">Sign In</h2>
      <form
        [formGroup]="reactiveForm"
        (submit)="onSubmit()"
        class="reg-sign-in-form"
      >
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="youremail@gmail.com"
          formControlName="email"
        />
        <span class="span-alert" *ngIf="invalidInput('email')"
          >Email required!</span
        >
        <label>Password:</label>
        <input
          type="{{ inputType }}"
          id="password"
          placeholder="6-10 characters"
          formControlName="password"
        />
        <span class="span-alert" *ngIf="invalidInput('password')"
          >Password required!</span
        >
        <button class="btn sign-in-btn" type="submit" value="Sing In">
          Sing In
        </button>
        <button
          type="button"
          class="show-ps-btn"
          (click)="setShowPassword(!showPassword)"
        >
          show password
        </button>
        <a class="reg-link" routerLink="/registration"
          >Don't have an account? Register here</a
        >
        <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
      </form>
    </div>
  `,
  styleUrls: ['./page-style.css'],
})
export class SignInPageComponent implements OnInit, OnDestroy {
  reactiveForm: any;
  showPassword: boolean = false;
  inputType: string = 'password';

  constructor(
    public toastService: ToastService,
    public router: Router,
    public userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#^!%*?&])[A-Za-z\d@$#^!%*?&]{6,10}$/
        ),
      ]),
    });
    this.authService.getUsers().subscribe((resultFromDB: Iuser[]) => {
      this.userService.registeredUsers = resultFromDB.map((item) => item);
    });
  }

  invalidInput(inputType: string): boolean {
    return (
      !this.reactiveForm.get(inputType).valid &&
      this.reactiveForm.get(inputType).touched &&
      this.reactiveForm.get(inputType).value.length == 0
    );
  }

  setShowPassword(showPasswordUpdate: boolean) {
    this.showPassword = showPasswordUpdate;
    this.showPassword
      ? (this.inputType = 'text')
      : (this.inputType = 'password');
  }

  onSubmit() {
    if (
      !this.reactiveForm.get('email').valid &&
      !this.reactiveForm.get('password').valid
    )
      this.showWarning(messages.required2fields);
    else if (!this.reactiveForm.get('email').valid)
      this.showWarning(messages.emailRequired);
    else if (!this.reactiveForm.get('password').valid)
      this.showWarning(messages.passwordRequired);
    else {
      try {
        this.setLoginUser(
          this.reactiveForm.get('email').value,
          this.reactiveForm.get('password').value
        );
      } catch (error) {
        this.showWarning(error);
        if (!this.authService.isLogin) {
          console.log('failed');
          this.showWarning(messages.notRegisteredMessage);
        }
      }
    }
  }

  setLoginUser(email: string, password: string) {
    if (this.authService.isLogin) {
      throw messages.allreadyLogin;
    }

    let tempUser: LoginUserDTO = { email: email, password: password };

    this.authService.login(tempUser).subscribe((user: any) => {
      localStorage.setItem('Id', user.id);
      localStorage.setItem('Token', user.token);
      localStorage.setItem('RefreshToken', user.refreshToken);

      this.authService
        .getUserById(LocalStorageHandler.getLoginUserId())
        .subscribe((user) => {
          this.authService.isLogin = true;
          this.authService.loginUser = user;
          this.authService.loginUserChanged.next(user);
          console.log(user);
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2300);
        });
    });
  }

  showSuccess() {
    this.toastService.show(messages.welcomeMessage, {
      classname: 'bg-success text-light',
      delay: 2000,
    });
  }

  showWarning(message: any) {
    this.toastService.show(message, {
      classname: 'bg-warning text-light',
      delay: 2500,
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}

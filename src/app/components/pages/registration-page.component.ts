import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { messages } from '../../helpers/constants';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserRegisterDTO } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'registration',
  template: `
    <div class="auth-form-container">
      <h2 id="set-title">Registration</h2>
      <form
        [formGroup]="reactiveForm"
        (submit)="onSubmit()"
        class="reg-sign-in-form"
      >
        <label>Name:</label>
        <input
          type="text"
          id="user-name"
          placeholder="Your full name"
          formControlName="userName"
        />
        <span class="span-alert" *ngIf="invalidInput('userName')"
          >Full Name required!</span
        >
        <label>Email:</label>
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
          >Password must contain 6-10 characters,<br />
          one upper-case & one lower-case letter,<br />
          one number & one special character</span
        >
        <label>Confirm Password:</label>
        <input
          type="{{ inputType }}"
          id="password2"
          placeholder="Confirm your password"
          formControlName="password2"
        />
        <span class="span-alert" *ngIf="invalidInput('password2')"
          >You must confirm your password</span
        >

        <button class="btn sign-in-btn" type="submit" value="Sing In">
          Register
        </button>
        <button
          type="button"
          class="show-ps-btn"
          (click)="setShowPassword(!showPassword)"
        >
          show passwords
        </button>
        <a class="sign-in-link" routerLink="/sign-in"
          >Already have an account? Sign in here</a
        >
        <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
      </form>
    </div>
  `,
  styleUrls: ['./page-style.css'],
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  reactiveForm: any;
  showPassword: boolean = false;
  inputType: string = 'password';

  constructor(
    public toastService: ToastService,
    public authService: AuthService,
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#^!%*?&])[A-Za-z\d@$#^!%*?&]{6,10}$/
        ),
      ]),
      password2: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#^!%*?&])[A-Za-z\d@$#^!%*?&]{6,10}$/
        ),
      ]),
    });
  }
  invalidInput(inputType: string): boolean {
    return (
      !this.reactiveForm.get(inputType).valid &&
      this.reactiveForm.get(inputType).touched
    );
  }
  setShowPassword(showPasswordUpdate: boolean) {
    this.showPassword = showPasswordUpdate;
    this.showPassword
      ? (this.inputType = 'text')
      : (this.inputType = 'password');
  }
  onSubmit() {
    if (!this.reactiveForm.get('userName').valid)
      this.showWarning(messages.requiredAllFields);
    else if (!this.reactiveForm.get('email').valid)
      this.showWarning(messages.emailRequired);
    else if (!this.reactiveForm.get('password').valid)
      this.showWarning(messages.passwordRequired);
    else if (
      this.reactiveForm.get('password').value !=
      this.reactiveForm.get('password2').value
    )
      this.showWarning(messages.requiredIdenticalPs);
    else {
      try {
        this.addUser(
          this.reactiveForm.get('userName').value,
          this.reactiveForm.get('email').value,
          this.reactiveForm.get('password').value
        );
      } catch (error) {
        this.showWarning(error);
      }
      setTimeout(() => {
        this.router.navigate(['/sign-in']);
      }, 2300);
    }
  }

  addUser(name: string, email: string, password: string) {
    let userToAdd: UserRegisterDTO = {
      userName: name,
      email: email,
      password: password,
    };
    try {
      this.authService.register(userToAdd).subscribe((res) => {
        console.log(res);
        if (res) {
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2300);
        } else throw messages.allreadyRegistered;
      });
    } catch (error) {
      throw messages.allreadyRegistered;
    }
  }
  showSuccess() {
    this.toastService.show(messages.registeredMessage, {
      classname: 'bg-primary text-light',
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page.component';
import { AboutPageComponent } from './components/pages/about-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page.component';
import { RegistrationPageComponent } from './components/pages/registration-page.component';
import { MyHeaderComponent } from './components/header/header.component';
import { StoreComponent } from './components/store/store.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './components/toast/toasts-container.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchComponent } from './components/search/search.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { UserService } from './services/user.service';
import { SignOutBtnComponent } from './components/sign-out-btn/sign-out-btn.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { SelectSizeComponent } from './components/select-size/select-size.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './services/interceptors/jwt.interceptor';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { OrderComponent } from './components/order/order.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    SearchComponent,
    HomePageComponent,
    AboutPageComponent,
    SignInPageComponent,
    RegistrationPageComponent,
    StoreComponent,
    FooterComponent,
    CartComponent,
    MenuButtonComponent,
    SignOutBtnComponent,
    AddItemComponent,
    SelectSizeComponent,
    ManageOrdersComponent,
    OrderComponent,
    UserOrdersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgbToast,
    ToastsContainer,
    HttpClientModule,
  ],

  providers: [
    UserService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

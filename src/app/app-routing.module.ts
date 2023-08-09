import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page.component';
import { AboutPageComponent } from './components/pages/about-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageComponent } from './components/pages/registration-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { OrdersManagementGuard } from './guards/orders-management.guard';
import { EnableCartGuard } from './guards/enable-cart.guard';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'sign-in',
    component: SignInPageComponent,
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [EnableCartGuard],
  },

  {
    path: 'manage-orders',
    component: ManageOrdersComponent,
    canActivate: [OrdersManagementGuard],
  },

  {
    path: 'app-user-orders',
    component: UserOrdersComponent,
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
  providers: [EnableCartGuard, OrdersManagementGuard],
})
export class AppRoutingModule {}

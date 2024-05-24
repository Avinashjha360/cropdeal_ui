import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/accounts/user-dashboard/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSuccessComponent } from './components/register/register-success.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountsInfoComponent } from './components/accounts/accounts-info/accounts-info.component';
import { authGuard } from './guards/auth.guard';
import { OrderComponent } from './components/accounts/user-dashboard/order/order.component';
import { AddProductComponent } from './components/accounts/farmer-dashboard/add-product/add-product.component';
import { FarmerOrderComponent } from './components/accounts/farmer-dashboard/order/order.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },
    {
        path: 'registersuccess',
        component: RegisterSuccessComponent,
        title: 'Registration Success'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details'
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Cart details',
    },
    {
        path: 'account',
        component: AccountsComponent,
        title: 'Account Section',
        canActivate:[authGuard],
        children: [
            {
                path: '',
                component: AccountsInfoComponent,
            },
            {
                path: 'cart',
                component: CartComponent,
            },
            {
                path: 'dealer/orders',
                component: OrderComponent,
            },
            {
                path: 'farmer/prdoucts',
                component: AddProductComponent,
            },
            {
                path: 'farmer/orders',
                component: FarmerOrderComponent,
            }
        ]

    },
    {
        path: '*',
        component: LoginComponent,
        title: 'Login Page'
    },
    
    


];

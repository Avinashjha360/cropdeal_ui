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
import { ProductComponent } from './components/accounts/farmer-dashboard/add-product/product.component';
import { UserListComponent } from './components/accounts/admin-dashboard/user-list/user-list.component';
import { OrderListComponent } from './components/accounts/admin-dashboard/order-list/order-list.component';
import { ProductListComponent } from './components/accounts/admin-dashboard/product-list/product-list.component';
import { FramerOrderListComponent } from './components/accounts/farmer-dashboard/order-list/order-list.component';
import { OrderSuccessComponent } from './components/accounts/user-dashboard/order-success/order-success.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
                component: DashboardComponent,
            },
            {
                path: 'profile',
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
                path: 'dealer/orders/:id',
                component: OrderSuccessComponent,
                title: 'Order details'
            },
            {
                path: 'farmer/prdoucts',
                component: ProductComponent,
            },
            {
                path: 'farmer/orders',
                component: FramerOrderListComponent,
            },
            {
                path: 'admin/products',
                component: ProductListComponent,
            },
            {
                path: 'admin/users',
                component: UserListComponent,
            },
            {
                path: 'admin/orders',
                component: OrderListComponent,
            },

        ]

    },
    {
        path: '*',
        component: LoginComponent,
        title: 'Login Page'
    },
    
    


];

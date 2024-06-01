import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/accounts/user-dashboard/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSuccessComponent } from './components/register/register-success.component';
import { AccountsInfoComponent } from './components/accounts/accounts-info/accounts-info.component';
import { authGuard } from './guards/auth.guard';
import { OrderComponent } from './components/accounts/user-dashboard/order/order.component';
import { ProductComponent } from './components/accounts/farmer-dashboard/add-product/product.component';
import { UserListComponent } from './components/accounts/admin-dashboard/user-list/user-list.component';
import { OrderListComponent } from './components/accounts/admin-dashboard/order-list/order-list.component';
import { ProductListComponent } from './components/accounts/admin-dashboard/product-list/product-list.component';
import { FramerOrderListComponent } from './components/accounts/farmer-dashboard/order-list/order-list.component';
import { OrderSuccessComponent } from './components/accounts/user-dashboard/order-success/order-success.component';
import { AdminComponent } from './components/accounts/admin-dashboard/admin-dashboard.component';
import { FarmerComponent } from './components/accounts/farmer-dashboard/farmer-dashboard.component';
import { AdminDashboardComponent } from './components/accounts/admin-dashboard/dashboard/dashboard.component';
import { FarmerDashboardComponent } from './components/accounts/farmer-dashboard/dashboard/dashboard.component';
import { UserComponent } from './components/accounts/user-dashboard/user-dashboard.component';
import { UserDashboardComponent } from './components/accounts/user-dashboard/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { farmerGuard } from './guards/farmer.guard';
import { CheckoutComponent } from './components/accounts/user-dashboard/checkout/checkout.component';

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
        path: 'checkout',
        component: CheckoutComponent,
        title: 'Checkout Page'
    },

    {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin Section',
        canActivate:[adminGuard],
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardComponent,
            },
            {
                path: 'profile',
                component: AccountsInfoComponent,
            },
            {
                path: 'users',
                component: UserListComponent,
            },
            {
                path: 'products',
                component: ProductListComponent,
            },
            {
                path: 'orders',
                component: OrderListComponent,
            },
            
        ]
    },
    {
        path: 'farmer',
        component: FarmerComponent,
        title: 'Farmer Section',
        canActivate:[farmerGuard],
        children: [
            {
                path: 'dashboard',
                component: FarmerDashboardComponent,
            },
            {
                path: 'profile',
                component: AccountsInfoComponent,
            },
            {
                path: 'products',
                component: ProductComponent,
            },
            {
                path: 'orders',
                component: FramerOrderListComponent,
            },
        ]
    },
    {
        path: 'dealer',
        component: UserComponent,
        title: 'Dealer Section',
        canActivate:[authGuard],
        children: [
            {
                path: 'dashboard',
                component: UserDashboardComponent,
            },
            {
                path: 'profile',
                component: AccountsInfoComponent,
            },
            {
                path: 'products',
                component: ProductComponent,
            },
            {
                path: 'orders',
                component: OrderComponent,
            },
            {
                path: 'cart',
                component: CartComponent,
            },
            {
                path: 'orders/:id',
                component: OrderSuccessComponent,
                title: 'Order details'
            },

        ]
    },
    {
        path: '*',
        component: LoginComponent,
        title: 'Login Page'
    },
    
    


];

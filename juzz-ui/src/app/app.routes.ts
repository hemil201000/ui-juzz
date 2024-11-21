import { Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment/payment.component';
import { AmountEnterComponent } from './enter-amount/amount-enter/amount-enter.component';
import { PaymentSubmitComponent } from './payment-submit/payment-submit.component';
import { AdminTransactionComponent } from './admin/admin-transaction/admin-transaction.component';
import { LoginComponent } from './admin/login/login.component';

export const routes: Routes = [
    { path: '', component: AmountEnterComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'submit-transaction', component: PaymentSubmitComponent },
    { path: 'admin-transaction', component: AdminTransactionComponent },
    { path: 'login', component: LoginComponent },
];

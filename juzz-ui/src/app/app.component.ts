import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmountEnterComponent } from './enter-amount/amount-enter/amount-enter.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { PaymentSubmitComponent } from './payment-submit/payment-submit.component';
import { AdminTransactionComponent } from './admin-transaction/admin-transaction.component';
import { StringFilterComponent } from './shared/string-filter/string-filter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , AmountEnterComponent , PaymentComponent , PaymentSubmitComponent , StringFilterComponent  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'juzz-ui';
}

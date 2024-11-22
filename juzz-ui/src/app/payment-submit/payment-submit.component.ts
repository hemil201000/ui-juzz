import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-submit',
  standalone: true,
  imports: [],
  templateUrl: './payment-submit.component.html',
  styleUrl: './payment-submit.component.css'
})
export class PaymentSubmitComponent implements OnInit{
  saveTransactionId: string = '';
  saveResponse: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.saveTransactionId = params['submitResponseId'];
      
    });
    
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSubmitComponent } from './payment-submit.component';

describe('PaymentSubmitComponent', () => {
  let component: PaymentSubmitComponent;
  let fixture: ComponentFixture<PaymentSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

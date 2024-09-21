import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountEnterComponent } from './amount-enter.component';

describe('AmountEnterComponent', () => {
  let component: AmountEnterComponent;
  let fixture: ComponentFixture<AmountEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountEnterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmountEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

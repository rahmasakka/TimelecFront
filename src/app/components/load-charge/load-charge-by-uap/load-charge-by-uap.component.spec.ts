import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadChargeByUapComponent } from './load-charge-by-uap.component';

describe('LoadChargeByUapComponent', () => {
  let component: LoadChargeByUapComponent;
  let fixture: ComponentFixture<LoadChargeByUapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadChargeByUapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadChargeByUapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadChargeDetailsComponent } from './load-charge-details.component';

describe('LoadChargeDetailsComponent', () => {
  let component: LoadChargeDetailsComponent;
  let fixture: ComponentFixture<LoadChargeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadChargeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadChargeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

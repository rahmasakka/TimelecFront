import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoadChargeComponent } from './create-load-charge.component';

describe('CreateLoadChargeComponent', () => {
  let component: CreateLoadChargeComponent;
  let fixture: ComponentFixture<CreateLoadChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLoadChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoadChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreChargeComponent } from './centre-charge.component';

describe('CentreChargeComponent', () => {
  let component: CentreChargeComponent;
  let fixture: ComponentFixture<CentreChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadChargeUpdateComponent } from './load-charge-update.component';

describe('LoadChargeUpdateComponent', () => {
  let component: LoadChargeUpdateComponent;
  let fixture: ComponentFixture<LoadChargeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadChargeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadChargeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

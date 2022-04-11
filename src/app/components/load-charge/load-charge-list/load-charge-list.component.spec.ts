import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadChargeListComponent } from './load-charge-list.component';

describe('LoadChargeListComponent', () => {
  let component: LoadChargeListComponent;
  let fixture: ComponentFixture<LoadChargeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadChargeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadChargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

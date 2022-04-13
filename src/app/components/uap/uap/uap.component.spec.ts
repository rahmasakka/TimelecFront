import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UapComponent } from './uap.component';

describe('UapComponent', () => {
  let component: UapComponent;
  let fixture: ComponentFixture<UapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

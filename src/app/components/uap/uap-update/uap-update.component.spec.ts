import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UapUpdateComponent } from './uap-update.component';

describe('UapUpdateComponent', () => {
  let component: UapUpdateComponent;
  let fixture: ComponentFixture<UapUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UapUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UapUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

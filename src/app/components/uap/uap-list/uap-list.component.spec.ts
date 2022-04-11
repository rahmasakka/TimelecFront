import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UapListComponent } from './uap-list.component';

describe('UapListComponent', () => {
  let component: UapListComponent;
  let fixture: ComponentFixture<UapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UapListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUapComponent } from './create-uap.component';

describe('CreateUapComponent', () => {
  let component: CreateUapComponent;
  let fixture: ComponentFixture<CreateUapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

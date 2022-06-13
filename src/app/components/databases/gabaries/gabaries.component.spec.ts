import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabariesComponent } from './gabaries.component';

describe('GabariesComponent', () => {
  let component: GabariesComponent;
  let fixture: ComponentFixture<GabariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GabariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GabariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

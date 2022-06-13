import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteursComponent } from './testeurs.component';

describe('TesteursComponent', () => {
  let component: TesteursComponent;
  let fixture: ComponentFixture<TesteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

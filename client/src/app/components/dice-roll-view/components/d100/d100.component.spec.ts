import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D100Component } from './d100.component';

describe('D100Component', () => {
  let component: D100Component;
  let fixture: ComponentFixture<D100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

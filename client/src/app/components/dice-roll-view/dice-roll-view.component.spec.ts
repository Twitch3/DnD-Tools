import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollViewComponent } from './dice-roll-view.component';

describe('DiceRollViewComponent', () => {
  let component: DiceRollViewComponent;
  let fixture: ComponentFixture<DiceRollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiceRollViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceRollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

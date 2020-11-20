import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleMapViewComponent } from './battle-map-view.component';

describe('BattleMapViewComponent', () => {
  let component: BattleMapViewComponent;
  let fixture: ComponentFixture<BattleMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleMapViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

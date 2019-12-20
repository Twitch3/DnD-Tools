import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCubeComponent } from './map-cube.component';

describe('MapCubeComponent', () => {
  let component: MapCubeComponent;
  let fixture: ComponentFixture<MapCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

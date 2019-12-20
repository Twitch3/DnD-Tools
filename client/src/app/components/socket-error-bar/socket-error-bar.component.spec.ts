import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketErrorBarComponent } from './socket-error-bar.component';

describe('SocketErrorBarComponent', () => {
  let component: SocketErrorBarComponent;
  let fixture: ComponentFixture<SocketErrorBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketErrorBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketErrorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

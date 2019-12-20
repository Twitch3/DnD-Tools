import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditorModalComponent } from './cell-editor-modal.component';

describe('CellEditorModalComponent', () => {
  let component: CellEditorModalComponent;
  let fixture: ComponentFixture<CellEditorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

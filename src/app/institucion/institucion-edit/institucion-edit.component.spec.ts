import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionEditComponent } from './institucion-edit.component';

describe('InstitucionesEditComponent', () => {
  let component: InstitucionEditComponent;
  let fixture: ComponentFixture<InstitucionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

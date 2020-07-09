import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionManagerComponent } from './institucion-manager.component';

describe('InstitucionesManagerComponent', () => {
  let component: InstitucionManagerComponent;
  let fixture: ComponentFixture<InstitucionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

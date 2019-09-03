import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalEditComponent } from './profesional-edit.component';

describe('ProfesionalEditComponent', () => {
  let component: ProfesionalEditComponent;
  let fixture: ComponentFixture<ProfesionalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

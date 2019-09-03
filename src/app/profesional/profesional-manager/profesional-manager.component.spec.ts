import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalManagerComponent } from './profesional-manager.component';

describe('ProfesionalManagerComponent', () => {
  let component: ProfesionalManagerComponent;
  let fixture: ComponentFixture<ProfesionalManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

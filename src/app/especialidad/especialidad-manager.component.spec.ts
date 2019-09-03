import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosManagerComponent } from './cursos-manager.component';

describe('CursosManagerComponent', () => {
  let component: CursosManagerComponent;
  let fixture: ComponentFixture<CursosManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

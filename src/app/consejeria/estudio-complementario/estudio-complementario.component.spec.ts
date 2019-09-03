import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudioComplementarioComponent } from './estudio-complementario.component';

describe('EstudioComplementarioComponent', () => {
  let component: EstudioComplementarioComponent;
  let fixture: ComponentFixture<EstudioComplementarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudioComplementarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudioComplementarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

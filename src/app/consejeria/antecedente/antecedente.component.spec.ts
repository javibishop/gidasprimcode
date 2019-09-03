import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedenteComponent } from './antecedente.component';

describe('AntecedenteComponent', () => {
  let component: AntecedenteComponent;
  let fixture: ComponentFixture<AntecedenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

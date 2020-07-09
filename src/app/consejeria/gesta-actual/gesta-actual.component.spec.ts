import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaActualComponent } from './gesta-actual.component';

describe('GestaActualComponent', () => {
  let component: GestaActualComponent;
  let fixture: ComponentFixture<GestaActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejeriaManagerComponent } from './consejeria-manager.component';

describe('ConsejeriaManagerComponent', () => {
  let component: ConsejeriaManagerComponent;
  let fixture: ComponentFixture<ConsejeriaManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejeriaManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejeriaManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

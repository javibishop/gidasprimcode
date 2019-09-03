import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejeriaListComponent } from './consejeria-list.component';

describe('ConsejeriaListComponent', () => {
  let component: ConsejeriaListComponent;
  let fixture: ComponentFixture<ConsejeriaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejeriaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejeriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

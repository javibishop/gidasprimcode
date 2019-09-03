import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejeriaEditComponent } from './consejeria-edit.component';

describe('ConsejeriaEditComponent', () => {
  let component: ConsejeriaEditComponent;
  let fixture: ComponentFixture<ConsejeriaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejeriaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejeriaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

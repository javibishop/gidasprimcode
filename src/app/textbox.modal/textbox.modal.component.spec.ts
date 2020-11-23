import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxModalComponent } from './textbox.modal.component';

describe('TextboxModalComponent', () => {
  let component: TextboxModalComponent;
  let fixture: ComponentFixture<TextboxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextboxModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

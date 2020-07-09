import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistaPostComponent } from './entrevista-post.component';

describe('EntrevistaPostComponent', () => {
  let component: EntrevistaPostComponent;
  let fixture: ComponentFixture<EntrevistaPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrevistaPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrevistaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

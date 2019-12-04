import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonpostComponent } from './personpost.component';

describe('PersonpostComponent', () => {
  let component: PersonpostComponent;
  let fixture: ComponentFixture<PersonpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditRenterComponent } from './new-edit-renter.component';

describe('NewEditRenterComponent', () => {
  let component: NewEditRenterComponent;
  let fixture: ComponentFixture<NewEditRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

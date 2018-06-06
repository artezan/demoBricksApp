import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRenterComponent } from './list-renter.component';

describe('ListRenterComponent', () => {
  let component: ListRenterComponent;
  let fixture: ComponentFixture<ListRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

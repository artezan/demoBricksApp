import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepaComponent } from './list-depa.component';

describe('ListDepaComponent', () => {
  let component: ListDepaComponent;
  let fixture: ComponentFixture<ListDepaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDepaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEgressComponent } from './list-egress.component';

describe('ListEgressComponent', () => {
  let component: ListEgressComponent;
  let fixture: ComponentFixture<ListEgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

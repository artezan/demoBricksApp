import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropietariesComponent } from './list-propietaries.component';

describe('ListPropietariesComponent', () => {
  let component: ListPropietariesComponent;
  let fixture: ComponentFixture<ListPropietariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPropietariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropietariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIngressComponent } from './list-ingress.component';

describe('ListIngressComponent', () => {
  let component: ListIngressComponent;
  let fixture: ComponentFixture<ListIngressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIngressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIngressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
